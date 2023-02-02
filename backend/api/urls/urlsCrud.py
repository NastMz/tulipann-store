from django.urls import path, include
from api.views.crud import *

"""
In this file, all the routes to which the admin has access to perform CRUD actions are configured.
"""

urlpatterns = [
    path('categories/', include([
        path('', CategoryList.as_view(), name='category_list'),
        path('create/', CategoryCreate.as_view(), name='category_create'),
        path('<str:id>/', CategoryDetail.as_view(), name='category_detail'),
        path('<str:id>/update/', CategoryUpdate.as_view(), name='category_update'),
        path('<str:id>/delete/', CategoryDelete.as_view(), name='category_delete'),
    ])),

    path('roles/', include([
        path('', RoleList.as_view(), name='role_list'),
        path('create/', RoleCreate.as_view(), name='role_create'),
        path('<str:id>/', RoleDetail.as_view(), name='role_detail'),
        path('<str:id>/update/', RoleUpdate.as_view(), name='role_update'),
        path('<str:id>/delete/', RoleDelete.as_view(), name='role_delete'),
    ])),

    path('states/', include([
        path('', StateList.as_view(), name='state_list'),
        path('create/', StateCreate.as_view(), name='state_create'),
        path('<str:id>/', StateDetail.as_view(), name='state_detail'),
        path('<str:id>/update/', StateUpdate.as_view(), name='state_update'),
        path('<str:id>/delete/', StateDelete.as_view(), name='state_delete'),
    ])),

    path('subcategories/', include([
        path('', SubcategoryList.as_view(), name='subcategory_list'),
        path('create/', SubcategoryCreate.as_view(), name='subcategory_create'),
        path('<str:id>/', SubcategoryDetail.as_view(), name='subcategory_detail'),
        path('<str:id>/update/', SubcategoryUpdate.as_view(), name='subcategory_update'),
        path('<str:id>/delete/', SubcategoryDelete.as_view(), name='subcategory_delete'),
    ])),

    path('tags/', include([
        path('', TagList.as_view(), name='tag_list'),
        path('create/', TagCreate.as_view(), name='tag_create'),
        path('<str:id>/', TagDetail.as_view(), name='tag_detail'),
        path('<str:id>/update/', TagUpdate.as_view(), name='tag_update'),
        path('<str:id>/delete/', TagDelete.as_view(), name='tag_delete'),
    ])),

    path('products/', include([
        path('', ProductList.as_view(), name='product_list'),
        path('create/', ProductCreate.as_view(), name='product_create'),
        path('<str:id>/', ProductDetail.as_view(), name='product_detail'),
        path('<str:id>/update/', ProductUpdate.as_view(), name='product_update'),
        path('<str:id>/delete/', ProductDelete.as_view(), name='product_delete'),
    ])),

    path('users/', include([
        path('', UserList.as_view(), name='user_list'),
        path('<str:id>/', UserDetail.as_view(), name='user_detail'),
    ])),

    path('articles/', include([
        path('', ArticleList.as_view(), name='article_list'),
        path('create/', ArticleCreate.as_view(), name='article_create'),
        path('<str:id>/', ArticleDetail.as_view(), name='article_detail'),
        path('<str:id>/update/', ArticleUpdate.as_view(), name='article_update'),
        path('<str:id>/delete/', ArticleDelete.as_view(), name='article_delete'),
    ])),

    path('commentaries/', include([
        path('', CommentaryList.as_view(), name='commentary_list'),
        path('<str:id>/', CommentaryDetail.as_view(), name='commentary_detail'),
    ])),

    path('departments/', include([
        path('', DepartmentList.as_view(), name='department_list'),
        path('<str:id>/', DepartmentDetail.as_view(), name='department_detail'),
    ])),

    path('orders/', include([
        path('', OrderList.as_view(), name='order_list'),
        path('<str:id>/', OrderDetail.as_view(), name='order_detail'),
        path('<str:id>/update/', OrderUpdate.as_view(), name='order_update'),
    ])),

    path('images/', include([
        path('', ImageList.as_view(), name='image_list'),
        path('create/', ImageCreate.as_view(), name='image_create'),
        path('<str:id>/', ImageDetail.as_view(), name='image_detail'),
        path('<str:id>/update/', ImageUpdate.as_view(), name='image_update'),
        path('<str:id>/delete/', ImageDelete.as_view(), name='image_delete'),
    ])),

    path('specifications/', include([
        path('', SpecificationList.as_view(), name='specification_list'),
        path('create/', SpecificationCreate.as_view(), name='specification_create'),
        path('<str:id>/', SpecificationDetail.as_view(), name='specification_detail'),
        path('<str:id>/update/', SpecificationUpdate.as_view(), name='specification_update'),
    ])),

    path('features/', include([
        path('', FeatureList.as_view(), name='feature_list'),
        path('create/', FeatureCreate.as_view(), name='feature_create'),
        path('<str:id>/', FeatureDetail.as_view(), name='feature_detail'),
        path('<str:id>/update/', FeatureUpdate.as_view(), name='feature_update'),
        path('<str:id>/delete/', FeatureDelete.as_view(), name='feature_delete'),
    ])),
]
