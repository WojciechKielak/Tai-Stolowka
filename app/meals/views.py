from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializer import *
from rest_framework.response import Response
from app.settings import LOCAL_PORT

# Create your views here.

class MealView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        output = [{"nazwa":output.nazwa, "opis":output.opis, "cena":output.cena, "photo_url":LOCAL_PORT+output.photo.url,
                   "wkoszyku":output.wkoszyku, "licznik":output.licznik}
                  for output in Meal.objects.all()]
                  
        return Response(output)
    
    def post(self, request):
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)