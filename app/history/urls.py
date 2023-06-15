from .views import post, history

from django.urls import path





urlpatterns = [

    path('', history, name='history-list'),

    path('<int:id>/', history, name='history-detail'),

    path('post/', post, name='history-create'),

]