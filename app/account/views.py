from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        token['pk'] = user.pk
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'token',
        'token/refresh',
    ]
    return Response(routes)
    

@api_view(['POST'])
def createUser(request):
    # Extract the user data from the request
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')

        # Perform validation and create the user
        if email and password and role:
            # Your user creation logic here
            # Example code to create a new user:
            hashed_password = make_password(password)
            user = User.objects.create(email=email, password=hashed_password, role=role)
            
            if user:
                return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Failed to create user.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Invalid user data.'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    user_data = []
    for user in users:
        user_data.append({
            'pk': user.pk,
            'email': user.email,
            'role': user.get_role_display(),
            'timestamp': user.timestamp
        })
    return Response(user_data)

@api_view(['DELETE'])
def deleteUser(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return Response({'message': 'User deleted successfully.'})

