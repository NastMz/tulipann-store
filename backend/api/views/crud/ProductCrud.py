from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Product, Subcategory, Specification, Image, ProductSubcategory, Feature, Category
from api.serializers import ProductSerializer, ProductCrudSerializer, SpecificationCrudSerializer, \
    FeatureCrudSerializer, \
    ImageCrudSerializer, ProductSubcategorySerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image


class ProductList(APIView):
    """
    List all products with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all products with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all products.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        products = Product.all_objects.all()
        products_serialized = []
        for product in products:
            products_serialized.append(ProductSerializer.serialize_get_crud(product=product))
        return Response(products_serialized)


class ProductCreate(generics.GenericAPIView):
    """
    Create a new product.
    """
    serializer_class = ProductCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new product.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the product created or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if 'categoryId' not in request.data:
            return Response({"categoryId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Category.all_objects.filter(id=request.data['categoryId']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)

        request.data['category'] = request.data['categoryId']
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        messages = {}

        if 'subcategories' not in request.data:
            messages['subcategories'] = 'This field is required'
        if 'specification' not in request.data:
            messages['specification'] = 'This field is required'
        if 'features' not in request.data['specification']:
            messages['features'] = 'This field is required'
        if 'images' not in request.data:
            messages['images'] = 'This field is required'
        if Specification.all_objects.filter(summary=request.data['specification']['summary']).exists():
            messages['specification'] = 'This specification is already assigned to another product'

        subcategories = request.data['subcategories']
        specification = request.data['specification']
        features = request.data['specification']['features']
        images = request.data['images']

        for subcategory in subcategories:
            if Subcategory.all_objects.get(id=subcategory['subcategoryId']).category.id != \
                    request.data['category']:
                messages['subcategory'] = 'The entered subcategory does not correspond to the product category '

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_product = Product.all_objects.get(name=request.data['name'])

        product_subcategory_serializer = ProductSubcategorySerializer()
        for subcategory in subcategories:
            data_product_subcategory = {
                'product': new_product,
                'subcategory': Subcategory.all_objects.get(id=subcategory['subcategoryId'])
            }
            if not ProductSubcategory.all_objects.filter(product=data_product_subcategory['product'],
                                                         subcategory=data_product_subcategory['subcategory']).exists():
                product_subcategory_serializer.create(data_product_subcategory)

        specification_serializer = SpecificationCrudSerializer()

        data_specification = {
            'summary': specification['summary'],
            'product': new_product
        }

        specification_serializer.create(data_specification)

        db_spec = Specification.all_objects.get(summary=specification['summary'])

        feature_serializer = FeatureCrudSerializer()

        for feature in features:
            image_feature = optimize_and_save_image(feature['image']['src'], 'feature', 'feature')
            data_feature = {
                'name': feature['featureName'],
                'title': feature['title'],
                'description': feature['description'],
                'image': image_feature,
                'hash': feature['image']['hash'],
                'specification': db_spec
            }
            feature_serializer.create(data_feature)

        image_serializer = ImageCrudSerializer()

        for image in images:
            image_product = optimize_and_save_image(image['src'], 'product', 'product')
            data_image = {
                'src': image_product,
                'hash': image['hash'],
                'product': new_product
            }
            image_serializer.create(data_image)

        return Response({
            "RequestId": str(uuid.uuid4()),
            "Message": "Product created successfully",

            "Product": {
                "id": new_product.id,
                "name": serializer.data['name'],
                "description": serializer.data['description'],
                "stock": serializer.data['stock'],
                "price": serializer.data['price'],
                "categoryId": serializer.data['category']
            }}, status=status.HTTP_201_CREATED
        )


class ProductDetail(APIView):
    """
    Retrieve a product by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a product by id.
        Args:
            request: Request from client.
            id (str): Id of the product.

        Returns:
            (Response): Response with the subcategory.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        product = Product.all_objects.get(id=id)
        serializer = ProductSerializer.serialize_get_crud(product)
        return Response(serializer)


class ProductUpdate(APIView):
    """
    Update a product by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a product by id.
        Args:
            request: Request from client.
            id (str): Id of the product.

        Returns:
            (Response): Response with the product updated or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if 'categoryId' not in request.data:
            return Response({"categoryId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Category.all_objects.filter(id=request.data['categoryId']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)

        product = Product.all_objects.get(id=id)
        product_subcategories = ProductSubcategory.all_objects.filter(product=id)

        request.data['category'] = request.data['categoryId']

        for product_subcategory in product_subcategories:
            category_related = Subcategory.all_objects.get(id=product_subcategory.subcategory.id).category
            if category_related.id != request.data['categoryId']:
                return Response({"Errors": 'The category does not correspond to the subcategories of the product'})

        serializer = ProductSerializer(product, data=request.data)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        if Product.all_objects.filter(name=request.data['name']).exclude(id=id).exists():
            return Response({"name": 'This name is already assigned to another product'},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response({
            "Product updated": {
                "name": serializer.data['name'],
                "description": serializer.data['description'],
                "stock": serializer.data['stock'],
                "price": serializer.data['price'],
                "categoryId": serializer.data['category']
                }
            })


class ProductDelete(APIView):
    """
    Class to delete a product and everything related to it by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a product and everything related to it by id.
        Args:
            request: Request from client.
            id: Id of the product.

        Returns:
            (Response): Response with a message of success or error.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        product = Product.all_objects.get(id=id)
        product.soft_delete()

        db_product_subcat = list(ProductSubcategory.all_objects.filter(product=id))
        for product_subcat in db_product_subcat:
            product_subcat.soft_delete()

        spec = Specification.all_objects.get(product=product)
        spec.soft_delete()

        db_features = list(Feature.all_objects.filter(specification=spec))
        for feature in db_features:
            feature.soft_delete()

        db_images = list(Image.all_objects.filter(product=id))
        for image in db_images:
            image.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
