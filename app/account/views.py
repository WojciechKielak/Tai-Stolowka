from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status
from .validations import validate_password, validate_email
from django.contrib.auth import get_user_model, login, logout

from .models import *
from .serializers import *

# Create your views here.
class AccountListView(ListAPIView):
    queryset=Account.objects.all()
    serializer_class=AccountSerializer

class UserLogin(APIView):
    permission_classes = {permissions.AllowAny,}
    authentication_classes = {SessionAuthentication}
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
class UserLogout(APIView):
    permission_classes = {permissions.AllowAny,}
    authentication_classes = {}
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = AccountSerializer(request.user)
        return Response({'user':serializer.data}, status=status.HTTP_200_OK)