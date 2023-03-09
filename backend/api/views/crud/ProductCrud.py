from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Product, Subcategory, Specification, Image, ProductSubcategory, Feature, Category, Commentary, \
    OrderProduct, Department, ProductShipping
from api.serializers import ProductSerializer, ProductCrudSerializer, SpecificationCrudSerializer, \
    FeatureCrudSerializer, \
    ImageCrudSerializer, ProductSubcategorySerializer, SpecificationSerializer, ProductShippingSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, delete_images


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
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        products = Product.all_objects.all()
        products_serialized = []
        for product in products:
            products_serialized.append(ProductSerializer.serialize_get_crud(product=product))
        return Response({'products': products_serialized})


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
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        if 'categoryId' not in request.data:
            messages.append('La categoría es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)
        
        if not Category.all_objects.filter(id=request.data['categoryId']).exists():
            messages.append('Esta categoría no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        request.data['category'] = request.data['categoryId']
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        if 'subcategories' not in request.data:
            messages.append('Las subcategorías son requeridas')

        if 'specification' not in request.data:
            messages.append('La especificación es requerida')

        if 'features' not in request.data['specification']:
            messages.append('Las características son requeridas')

        if 'images' not in request.data:
            messages.append('La información de las imagenes son requeridas')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if Specification.all_objects.filter(summary=request.data['specification']['summary']).exists():
            messages.append('Esta especificación ya está asignada a otro producto')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'summary' not in request.data['specification']:
            messages.append('El resumen de la especificación es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        subcategories = request.data['subcategories']
        specification = request.data['specification']
        features = request.data['specification']['features']
        images = request.data['images']

        for image in images:
            if 'src' not in image:
                messages.append('La imagen es requerida')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if 'hash' not in image:
                messages.append('El hash de la imagen es requerido')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        seen_feature_names = []

        for feature in features:
            if 'featureName' not in feature:
                messages.append('El nombre de la caracteristica es requerido.')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            feature_name = feature['featureName']

            if feature_name in seen_feature_names:
                messages.append(f'El valor de featureName "{feature_name}" está duplicado.')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            seen_feature_names.append(feature_name)

            if 'image' not in feature:
                messages.append('La información de la imagen para la caracteristica es requerida')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if 'src' not in feature['image']:
                messages.append('La imagen de la caracteristica es requerida')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if 'hash' not in feature['image']:
                messages.append('El hash de la imagen para la caracteristica es requerido')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        for subcategory in subcategories:
            if not Subcategory.all_objects.filter(id=subcategory['subcategoryId']).exists():
                messages.append('La subcategoría '+subcategory['subcategoryId']+' no existe')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if Subcategory.all_objects.get(id=subcategory['subcategoryId']).category.id != request.data['category']:
                messages.append('La subcategoría ingresada no corresponde a la categoría del producto')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'departments' in request.data:
            departments = request.data['departments']
            for department in departments:
                if 'departmentId' not in department:
                    messages.append('El id del departamento es requerido')
                    return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

                if not Department.all_objects.filter(id=department['departmentId']).exists():
                    messages.append('El departamento ' + department['departmentId'] + ' no existe')
                    return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_product = Product.all_objects.get(name=request.data['name'])

        # Create subcategories
        product_subcategory_serializer = ProductSubcategorySerializer()
        for subcategory in subcategories:
            data_product_subcategory = {
                'product': new_product,
                'subcategory': Subcategory.all_objects.get(id=subcategory['subcategoryId'])
            }
            if not ProductSubcategory.all_objects.filter(product=data_product_subcategory['product'],
                                                         subcategory=data_product_subcategory['subcategory']).exists():
                product_subcategory_serializer.create(data_product_subcategory)

        # Create ProductShipping
        if 'departments' in request.data:
            product_shipping_serializer = ProductShippingSerializer()
            for department in departments:
                data_product_shipping = {
                    'product': new_product,
                    'department': Department.all_objects.get(id=department['departmentId'])
                }
                if not ProductShipping.all_objects.filter(product=data_product_shipping['product'],
                                                          department=data_product_shipping['department']).exists():
                    product_shipping_serializer.create(data_product_shipping)

        # Create specification
        specification_serializer = SpecificationCrudSerializer()

        data_specification = {
            'summary': specification['summary'],
            'product': new_product
        }
        specification_serializer.create(data_specification)

        # Create features
        db_spec = Specification.all_objects.get(summary=specification['summary'])

        feature_serializer = FeatureCrudSerializer()

        for feature in features:
            image_feature = optimize_and_save_image(image_data=feature['image']['src'], object_name='feature')
            data_feature = {
                'name': feature['featureName'],
                'title': feature['title'],
                'description': feature['description'],
                'image': image_feature,
                'hash': feature['image']['hash'],
                'specification': db_spec
            }
            feature_serializer.create(data_feature)

        # Create images
        image_serializer = ImageCrudSerializer()

        for image in images:
            image_product = optimize_and_save_image(image_data=image['src'], object_name='product')
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
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not Product.all_objects.filter(id=id).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)
        
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
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Product.all_objects.filter(id=id).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'categoryId' not in request.data:
            messages.append('La categoría es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Category.all_objects.filter(id=request.data['categoryId']).exists():
            messages.append('Esta categoría no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'subcategories' not in request.data:
            messages.append('Las subcategorías son requeridas')

        if 'specification' not in request.data:
            messages.append('La especificación es requerida')

        if 'features' not in request.data['specification']:
            messages.append('Las características son requeridas')

        if 'images' not in request.data:
            messages.append('La información de las imagenes son requeridas')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'summary' not in request.data['specification']:
            messages.append('El resumen de la especificación es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        product = Product.all_objects.get(id=id)

        if Specification.all_objects.filter(summary=request.data['specification']['summary']).exclude(
                product=product.id).exists():
            messages.append('Esta especificación ya está asignada a otro producto')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        request.data['category'] = request.data['categoryId']
        subcategories = request.data['subcategories']
        specification = request.data['specification']
        features = request.data['specification']['features']
        images = request.data['images']

        for image in images:
            if 'src' not in image:
                messages.append('La imagen es requerida')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if 'hash' not in image:
                messages.append('El hash de la imagen es requerido')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        seen_feature_names = []

        for feature in features:
            if 'featureName' not in feature:
                messages.append('El nombre de la caracteristica es requerido.')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            feature_name = feature['featureName']

            if feature_name in seen_feature_names:
                messages.append(f'El valor de featureName "{feature_name}" está duplicado.')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            seen_feature_names.append(feature_name)

            if 'image' not in feature:
                messages.append('La información de la imagen para la caracteristica es requerida')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if 'src' not in feature['image']:
                messages.append('La imagen de la caracteristica es requerida')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if 'hash' not in feature['image']:
                messages.append('El hash de la imagen para la caracteristica es requerido')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        for subcategory in subcategories:
            if not Subcategory.all_objects.filter(id=subcategory['subcategoryId']).exists():
                messages.append('La subcategoría ' + subcategory['subcategoryId'] + ' no existe')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            if Subcategory.all_objects.get(id=subcategory['subcategoryId']).category.id != request.data['category']:
                messages.append('La subcategoría ingresada no corresponde a la categoría del producto')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if Product.all_objects.filter(name=request.data['name']).exclude(id=id).exists():
            messages.append('Este nombre ya está asignado a otro producto')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'departments' in request.data:
            departments = request.data['departments']
            for department in departments:
                if 'departmentId' not in department:
                    messages.append('El id del departamento es requerido')
                    return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

                if not Department.all_objects.filter(id=department['departmentId']).exists():
                    messages.append('El departamento ' + department['departmentId'] + ' no existe')
                    return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProductSerializer(product, data=request.data)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        # Update subcategories
        product_subcategory_serializer = ProductSubcategorySerializer()

        refresh_product_subactegory = ProductSubcategory.all_objects.filter(product=product)

        for prod_subcat in refresh_product_subactegory:
            prod_subcat.delete()

        for subcategory in subcategories:
            data_product_subcategory = {
                'product': product,
                'subcategory': Subcategory.all_objects.get(id=subcategory['subcategoryId'])
            }
            if not ProductSubcategory.all_objects.filter(product=data_product_subcategory['product'],
                                                         subcategory=data_product_subcategory['subcategory']).exists():
                product_subcategory_serializer.create(data_product_subcategory)

        # Update productShipping
        if 'departments' in request.data:
            product_shipping_serializer = ProductShippingSerializer()

            refresh_product_shipping = ProductShipping.all_objects.filter(product=product)

            for prod_shipp in refresh_product_shipping:
                prod_shipp.delete()

            for department in departments:
                data_product_shipping = {
                    'product': product,
                    'department': Department.all_objects.get(id=department['departmentId'])
                }
                if not ProductShipping.all_objects.filter(product=data_product_shipping['product'],
                                                          department=data_product_shipping['department']).exists():
                    product_shipping_serializer.create(data_product_shipping)
        else:
            refresh_product_shipping = ProductShipping.all_objects.filter(product=product)

            for prod_shipp in refresh_product_shipping:
                prod_shipp.delete()

            messages.append('Se eliminaron todos los departamentos de envio, ahora el producto tiene envio a nivel nacional.')

        # Update specification
        specification_obj = Specification.all_objects.get(product=product.id)

        data_specification = {
            'summary': specification['summary'],
            'product': product.id
        }

        specification_serializer = SpecificationSerializer(specification_obj, data=data_specification)

        if not specification_serializer.is_valid():
            return Response({"Errors": specification_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        specification_serializer.save()

        # Update features
        refresh_feature = Feature.all_objects.filter(specification=specification_obj.id)

        for feature_ref in refresh_feature:
            delete_images(feature_ref, 'image')
            feature_ref.delete()

        feature_serializer = FeatureCrudSerializer()

        for feature in features:
            image_feature = optimize_and_save_image(image_data=feature['image']['src'], object_name='feature')
            data_feature = {
                'name': feature['featureName'],
                'title': feature['title'],
                'description': feature['description'],
                'image': image_feature,
                'hash': feature['image']['hash'],
                'specification': specification_obj
            }
            feature_serializer.create(data_feature)

        # Update images
        refresh_image = Image.all_objects.filter(product=product.id)

        for image_ref in refresh_image:
            delete_images(image_ref, 'src')
            image_ref.delete()

        image_serializer = ImageCrudSerializer()

        for image in images:
            image_product = optimize_and_save_image(image_data=image['src'], object_name='product')
            data_image = {
                'src': image_product,
                'hash': image['hash'],
                'product': product
            }
            image_serializer.create(data_image)

        return Response({
            "Message": messages,
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
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Product.all_objects.filter(id=id).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        product = Product.all_objects.get(id=id)
        product.soft_delete()

        db_product_subcat = list(ProductSubcategory.all_objects.filter(product=id))
        for product_subcat in db_product_subcat:
            product_subcat.soft_delete()

        db_product_shipp = list(ProductShipping.all_objects.filter(product=id))
        for product_shipp in db_product_shipp:
            product_shipp.soft_delete()

        if Specification.all_objects.filter(product=product).exists():
            spec = Specification.all_objects.get(product=product)
            spec.soft_delete()

            db_features = list(Feature.all_objects.filter(specification=spec))
            for feature in db_features:
                delete_images(feature, 'image')
                feature.soft_delete()

        db_images = list(Image.all_objects.filter(product=id))
        for image in db_images:
            delete_images(image, 'src')
            image.soft_delete()

        db_comments = list(Commentary.all_objects.filter(product=id))
        for comment in db_comments:
            comment.soft_delete()

        db_order_product = list(OrderProduct.all_objects.filter(product=id))
        for order_product in db_order_product:
            order_product.order.soft_delete()
            order_product.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
