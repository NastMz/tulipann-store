from rest_framework import routers
from api.views.client import *

router = routers.DefaultRouter()

router.register('data/articles/list/', ArticleViewset, 'articles')
router.register('data/categories/list/', CategoryViewset, 'categories')
router.register('data/commentaries/list/', CommentaryViewset, 'commentaries')
router.register('data/features/list/', FeatureViewset, 'features')
router.register('data/images/list/', ImageViewset, 'images')
router.register('data/order_products/list/', OrderProductViewset, 'order_products')
router.register('data/products/list/', ProductViewset, 'products')
router.register('data/orders/list/', OrderViewset, 'orders')
router.register('data/specifications/list/', SpecificationViewset, 'specifications')
router.register('data/subcategories/list/', SubcategoryViewset, 'subcategories')
router.register('data/users/list/', UserViewset, 'users')

urlpatterns = router.urls
