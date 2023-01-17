from rest_framework import serializers
from ..models import Category, Product, Subcategory, Specification, Feature, Image, ProductSubcategory
from ..serializers import ImageSerializer, SpecificationSerializer, CommentarySerializer, ProductSubcategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    def serialize_front(product):
        specs = SpecificationSerializer.SpecificationSerializer.serialize_front(product=product)
        images = ImageSerializer.serialize_front(product=product)
        feedback = CommentarySerializer.serialize_front(product=product)
        category = Category.all_objects.get(category_id=product.category.category_id)
        subcategories = ProductSubcategorySerializer.ProductSubcategorySerializer.serialize_front(product=product)

        return {
            'id': product.product_id,
            'name': product.product_name,
            'price': product.price,
            'description': product.description,
            'specs': specs,
            'stock': product.stock,
            'images': images,
            'feedback': feedback,
            'category': category.category_id,
            'subcategories': subcategories
        }

    def serialize_get_crud(product):
        db_subcat = list(ProductSubcategory.all_objects.filter(product=product))

        subcategories = []
        for subcat in db_subcat:
            subcategories.append({
                'subcategory_id': subcat.subcategory.subcategory_id
            })

        db_spec = Specification.all_objects.get(product=product)
        db_features = list(Feature.all_objects.filter(specification=db_spec))

        features = []
        for feature in db_features:
            features.append({
                'feature_id': feature.feature_id,
                'feature_name': feature.feature_name,
                'title': feature.title,
                'description': feature.description,
                'image': feature.image,
                'hash': feature.hash
            })

        specification = {
                'specification_id': db_spec.specification_id,
                'summary': db_spec.summary,
                'features': features
            }

        db_images = list(Image.all_objects.filter(product=product))

        images = []
        for image in db_images:
            images.append({
                'image_id': image.image_id,
                'image_name': image.image_name,
                'hash': image.hash
            })

        return {
            'product_id': product.product_id,
            'product_name': product.product_name,
            'description': product.description,
            'stock': product.stock,
            'price': product.price,
            'category': product.category.category_id,
            'subcategories': subcategories,
            'specification': specification,
            'images': images
        }

    class Meta:
        model = Product
        fields = (
            'product_name',
            'description',
            'stock',
            'price',
            'category'
        )
