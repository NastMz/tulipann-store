from django.urls import path, include
from api.views.crud import CommentaryCreate, CommentaryUpdate, OrderCreate, CommentaryDelete
from api.views.data import UserSelfView, UserSelfUpdateView, ArticleView, CategoryView, CommentaryView, FeatureView, \
    ImageView, OrderProductView, OrderView, ProductView, SpecificationView, SubcategoryView, UserView, DepartmentList, \
    DepartmentDetail, CityList, CityDetail, StateList, StateDetail
from api.views.data.CityView import CityDepartment

"""
This file configures all the routes that a user has access to see at the top of the page 
and also to see and change their own information.

In addition, this file contains the routes to which a user has access to add information to the database, 
such as their comments or their orders.
"""

urlpatterns = [
    path('articles/', ArticleView.as_view(), name='articles_list'),
    path('categories/', CategoryView.as_view(), name='categories_list'),

    path('commentaries/', include([
        path('', CommentaryView.as_view(), name='commentaries_list'),
        path('create/', CommentaryCreate.as_view(), name='commentary_create'),
        path('<str:id>/update/', CommentaryUpdate.as_view(), name='commentary_update'),
        path('<str:id>/delete/', CommentaryDelete.as_view(), name='commentary_delete'),
    ])),

    path('departments/', include([
        path('', DepartmentList.as_view(), name='department_list'),
        path('<str:id>/', DepartmentDetail.as_view(), name='department_detail'),
    ])),

    path('cities/', include([
        path('', CityList.as_view(), name='city_list'),
        path('department/<str:id>', CityDepartment.as_view(), name='city_department'),
        path('<str:id>/', CityDetail.as_view(), name='city_detail'),
    ])),

    path('features/', FeatureView.as_view(), name='features_list'),
    path('images/', ImageView.as_view(), name='images_list'),
    path('order_products/', OrderProductView.as_view(), name='order_products_list'),

    path('orders/', include([
        path('', OrderView.as_view(), name='orders_list'),
        path('create/', OrderCreate.as_view(), name='order_crud'),
    ])),

    path('products/', ProductView.as_view(), name='products_list'),
    path('specifications/', SpecificationView.as_view(), name='specifications_list'),

    path('states/', include([
        path('', StateList.as_view(), name='state_list'),
        path('<str:id>/', StateDetail.as_view(), name='state_detail'),
    ])),

    path('subcategories/', SubcategoryView.as_view(), name='subcategories_list'),
    path('users/', UserView.as_view(), name='users_list'),

    path('user/', include([
        path('', UserSelfView.as_view(), name='view_user'),
        path('update/', UserSelfUpdateView.as_view(), name='update_user'),
    ]))
]
