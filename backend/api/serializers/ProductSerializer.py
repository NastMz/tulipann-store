from rest_framework import serializers
from ..models import Category, Product, Subcategory, Specification, Feature, Image, ProductSubcategory
from ..serializers import ImageSerializer, SpecificationSerializer, CommentarySerializer, ProductSubcategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    def serialize_front(product):
        specs = SpecificationSerializer.SpecificationSerializer.serialize_front(product=product)
        images = ImageSerializer.serialize_front(product=product)
        feedback = CommentarySerializer.serialize_front(product=product)
        category = Category.all_objects.get(id=product.category.id)
        subcategories = ProductSubcategorySerializer.ProductSubcategorySerializer.serialize_front(product=product)

        return {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'specs': specs,
            'stock': product.stock,
            'images': images,
            'feedback': feedback,
            'category': category.id,
            'subcategories': subcategories
        }

    def serialize_get_crud(product):
        db_subcat = list(ProductSubcategory.all_objects.filter(product=product))

        subcategories = []
        for subcat in db_subcat:
            subcategories.append({
                'subcategoryId': subcat.subcategory.id
            })

        db_spec = Specification.all_objects.get(product=product)
        db_features = list(Feature.all_objects.filter(specification=db_spec))

        features = []
        for feature in db_features:
            features.append({
                'featureId': feature.id,
                'featureName': feature.name,
                'title': feature.title,
                'description': feature.description,
                'image': {
                    'src': feature.image,
                    'hash': feature.hash
                }
            })

        specification = {
                'specificationId': db_spec.id,
                'summary': db_spec.summary,
                'features': features
            }

        db_images = list(Image.all_objects.filter(product=product))

        images = []
        for image in db_images:
            images.append({
                'imageId': image.id,
                'image': {
                    'src': image.src,
                    'hash': image.hash
                }
            })

        return {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'stock': product.stock,
            'price': product.price,
            'categoryId': product.category.id,
            'subcategories': subcategories,
            'specification': specification,
            'images': images
        }

    class Meta:
        model = Product
        fields = (
            'name',
            'description',
            'stock',
            'price',
            'category'
        )
