from rest_framework import routers
from api.views.client import *

"""
This file configures all the routes that a user has access to see at the top of the page.
"""

router = routers.DefaultRouter()

router.register('articles', ArticleViewset, 'articles_list')
router.register('categories', CategoryViewset, 'categories_list')
router.register('commentaries', CommentaryViewset, 'commentaries_list')
router.register('features', FeatureViewset, 'features_list')
router.register('images', ImageViewset, 'images_list')
router.register('products', ProductViewset, 'products_list')
router.register('order_products', OrderProductViewset, 'order_products_list')
router.register('orders', OrderViewset, 'orders_list')
router.register('specifications', SpecificationViewset, 'specifications_list')
router.register('subcategories', SubcategoryViewset, 'subcategories_list')
router.register('users', UserViewset, 'users_list')

urlpatterns = router.urls
