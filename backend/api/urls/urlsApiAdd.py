from django.urls import path, include
from api.views.crud import CommentaryCreate, CommentaryUpdate, OrderCreate, CommentaryDelete

"""
In this file, all the routes to which a user has access to add information to the database, such as their comments 
or their orders, are configured.
"""

urlpatterns = [

    path('commentaries/', include([
        path('create/', CommentaryCreate.as_view(), name='commentary_create'),
        path('<str:id>/update/', CommentaryUpdate.as_view(), name='commentary_update'),
        path('<str:id>/delete/', CommentaryDelete.as_view(), name='commentary_delete'),
    ])),

    path('orders/create/', OrderCreate.as_view(), name='order_crud'),
]
