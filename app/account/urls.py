from django.urls import path
from .views import getRoutes, MyTokenObtainPairView, createUser, getUsers, deleteUser
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns=[
    path('', getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-user/', createUser, name='create_user'),
    path('users/', getUsers, name='get_users'),
    path('users/<int:user_id>/', deleteUser, name='delete_user')
]