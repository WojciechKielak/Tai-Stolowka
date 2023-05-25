from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields = ('username','password','email')

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    def check_user(self,clean_data):
        user = authenticate(username=clean_data['email'], 
                            password=clean_data['password'])
        if not user:
            raise ValidationError('Nie znaleziono uzytkownika w bazie')
        return user
