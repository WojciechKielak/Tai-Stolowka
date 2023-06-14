from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializer import *
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from app.settings import LOCAL_PORT
from django.http import JsonResponse

# Create your views here.

class MealView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk is not None:
            meal = get_object_or_404(Meal, pk=pk)
            output = {
                'pk': meal.pk,
                'nazwa': meal.nazwa,
                'opis': meal.opis,
                'cena': meal.cena,
                'photo_url': LOCAL_PORT + meal.photo.url
            }
            return Response(output)
        
        output = [{'pk': meal.pk, 'nazwa': meal.nazwa, 'opis': meal.opis, 'cena': meal.cena, 'photo_url': LOCAL_PORT + meal.photo.url} for meal in Meal.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def delete(self, request, pk):
        try:
            print(pk)
            #pk = request.GET.get('pk')
            #print(pk)
            meal = Meal.objects.get(pk=pk)
            meal.photo.delete()  # Delete associated photo file
            meal.delete()
            
            return Response({"message": "Meal deleted successfully"})
        except Meal.DoesNotExist:
            return Response({"message": "Meal not found"}, status=404)
        
    def put(self, request, pk):
        try:
            meal = Meal.objects.get(pk=pk)
        except Meal.DoesNotExist:
            return Response({'message': 'Meal not found.'}, status=404)

        serializer = MealSerializer(meal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Meal updated successfully.'})
        else:
            return Response(serializer.errors, status=400)