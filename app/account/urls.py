from django.urls import path
from .views import *

urlpatterns = [
    path('login',UserLogin.as_view(), name='login'),
    path('logout',UserLogout.as_view(), name='logout'),
    path('user',UserView.as_view(), name='user'),
    #path('',AccountListView.as_view())
]
