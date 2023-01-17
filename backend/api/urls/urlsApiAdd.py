from django.urls import path
from api.views.crud import CommentaryRegister, CommentaryPut, OrderRegister, CommentaryDel

urlpatterns = [
    path('data/commentary/add/', CommentaryRegister.as_view(), name='commentary_crud'),
    path('data/commentary/update/<str:id>', CommentaryPut.as_view(), name='commentary_crud'),
    path('data/commentary/delete/<str:id>', CommentaryDel.as_view(), name='commentary_crud'),
    path('data/order/add/', OrderRegister.as_view(), name='order_crud'),
]
