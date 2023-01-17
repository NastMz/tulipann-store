from django.urls import path
from api.views.crud import *

urlpatterns = [
    path('category/list/', CategoryList.as_view(), name='category_crud'),
    path('category/add/', CategoryRegister.as_view(), name='category_crud'),
    path('category/update/<str:id>', CategoryPut.as_view(), name='category_crud'),
    path('category/delete/<str:id>', CategoryDel.as_view(), name='category_crud'),

    path('role/list/', RoleList.as_view(), name='role_crud'),
    path('role/add/', RoleRegister.as_view(), name='role_crud'),
    path('role/update/<str:id>', RolePut.as_view(), name='role_crud'),
    path('role/delete/<str:id>', RoleDel.as_view(), name='role_crud'),

    path('payment/list/', PaymentList.as_view(), name='payment_crud'),
    path('payment/add/', PaymentRegister.as_view(), name='payment_crud'),
    path('payment/update/<str:id>', PaymentPut.as_view(), name='payment_crud'),
    path('payment/delete/<str:id>', PaymentDel.as_view(), name='payment_crud'),

    path('state/list/', StateList.as_view(), name='state_crud'),
    path('state/add/', StateRegister.as_view(), name='state_crud'),
    path('state/update/<str:id>', StatePut.as_view(), name='state_crud'),
    path('state/delete/<str:id>', StateDel.as_view(), name='state_crud'),

    path('subcategory/list/', SubcategoryList.as_view(), name='subcategory_crud'),
    path('subcategory/add/', SubcategoryRegister.as_view(), name='subcategory_crud'),
    path('subcategory/update/<str:id>', SubcategoryPut.as_view(), name='subcategory_crud'),
    path('subcategory/delete/<str:id>', SubcategoryDel.as_view(), name='subcategory_crud'),

    path('tag/list/', TagList.as_view(), name='tag_crud'),
    path('tag/add/', TagRegister.as_view(), name='tag_crud'),
    path('tag/update/<str:id>', TagPut.as_view(), name='tag_crud'),
    path('tag/delete/<str:id>', TagDel.as_view(), name='tag_crud'),

    path('product/list/', ProductList.as_view(), name='product_crud'),
    path('product/add/', ProductRegister.as_view(), name='product_crud'),
    path('product/update/<str:id>', ProductPut.as_view(), name='product_crud'),
    path('product/delete/<str:id>', ProductDel.as_view(), name='product_crud'),

    path('users/list/', UserListView.as_view(), name='users'),

    path('article/list/', ArticleList.as_view(), name='article_crud'),
    path('article/add/', ArticleRegister.as_view(), name='article_crud'),
    path('article/update/<str:id>', ArticlePut.as_view(), name='article_crud'),
    path('article/delete/<str:id>', ArticleDel.as_view(), name='article_crud'),

    path('commentary/list/', CommentaryList.as_view(), name='commentary_crud'),

    path('order/list/', OrderList.as_view(), name='order_crud'),
    path('order/update/<str:id>', OrderPut.as_view(), name='order_crud'),

    path('image/list/', ImageList.as_view(), name='image_crud'),
    path('image/add/', ImageRegister.as_view(), name='image_crud'),
    path('image/update/<str:id>', ImagePut.as_view(), name='image_crud'),
    path('image/delete/<str:id>', ImageDel.as_view(), name='image_crud'),

    path('specification/list/', SpecificationList.as_view(), name='specification_crud'),
    path('specification/add/', SpecificationRegister.as_view(), name='specification_crud'),
    path('specification/update/<str:id>', SpecificationPut.as_view(), name='specification_crud'),

    path('feature/list/', FeatureList.as_view(), name='feature_crud'),
    path('feature/add/', FeatureRegister.as_view(), name='feature_crud'),
    path('feature/update/<str:id>', FeaturePut.as_view(), name='feature_crud'),
    path('feature/delete/<str:id>', FeatureDel.as_view(), name='feature_crud'),

    # path('order_product/list/', OrderProductList.as_view(), name='orderproduct_crud'),
    # path('order_product/add/', OrderProductRegister.as_view(), name='orderproduct_crud'),
    # path('order_product/update/<str:id>', OrderProductPut.as_view(), name='orderproduct_crud'),
    #
    # path('product_subcategory/list/', ProductSubcategoryList.as_view(), name='productsubcategory_crud'),
    # path('product_subcategory/add/', ProductSubcategoryRegister.as_view(), name='productsubcategory_crud'),
    # path('product_subcategory/update/<str:id>', ProductSubcategoryPut.as_view(), name='productsubcategory_crud'),
    #
    # path('department/list/', DepartmentList.as_view(), name='department_crud'),
    # path('department/add/', DepartmentRegister.as_view(), name='department_crud'),
    # path('department/update/<str:id>', DepartmentPut.as_view(), name='department_crud'),
]
