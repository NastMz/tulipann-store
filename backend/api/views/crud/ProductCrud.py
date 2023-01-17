from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Product, Subcategory, Specification, Image, ProductSubcategory, Feature, Category
from api.serializers import ProductSerializer, ProductCrudSerializer, SpecificationCrudSerializer, FeatureCrudSerializer,\
    ImageCrudSerializer, ProductSubcategorySerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image


class ProductList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        products = Product.all_objects.all()
        products_serialized = []
        for product in products:
            products_serialized.append(ProductSerializer.serialize_get_crud(product=product))
        return Response(products_serialized)


class ProductRegister(generics.GenericAPIView):
    serializer_class = ProductCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
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
            if Subcategory.all_objects.get(subcategory_id=subcategory['subcategory_id']).category.category_id != request.data['category']:
                messages['subcategory'] = 'The entered subcategory does not correspond to the product category '

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_product = Product.all_objects.get(product_name=request.data['product_name'])

        product_subcategory_serializer = ProductSubcategorySerializer()
        for subcategory in subcategories:
            data_product_subcategory = {
                'product': new_product,
                'subcategory': Subcategory.all_objects.get(subcategory_id=subcategory['subcategory_id'])
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
            image_feature = optimize_and_save_image(feature['image'], 'feature', 'feature')
            data_feature = {
                'feature_name': feature['feature_name'],
                'title': feature['title'],
                'description': feature['description'],
                'image': image_feature,
                'hash': feature['hash'],
                'specification': db_spec
            }
            feature_serializer.create(data_feature)

        image_serializer = ImageCrudSerializer()

        for image in images:
            image_product = optimize_and_save_image(image['image_name'], 'product', 'product')
            data_image = {
                'image_name': image_product,
                'hash': image['hash'],
                'product': new_product
            }
            image_serializer.create(data_image)

        return Response({
            "RequestId": str(uuid.uuid4()),
            "Message": "Product created succesfully",

            "Product": serializer.data}, status=status.HTTP_201_CREATED
        )


class ProductPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(product_id=id).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        product = Product.all_objects.get(product_id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(product_id=id).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not Category.all_objects.filter(category_id=request.data['category']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        product = Product.all_objects.get(product_id=id)
        serializer = ProductSerializer(product, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        if Product.all_objects.filter(product_name=request.data['product_name']).exclude(product_id=id).exists():
            return Response({"product_name": 'This name is already assigned to another product'},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data)


class ProductDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = ProductPut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(product_id=id).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        product = Product.all_objects.get(product_id=id)
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
