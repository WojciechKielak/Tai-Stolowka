from django.contrib import admin

from django.urls import path, include

from django.views.generic import TemplateView

from meals.views import *

from django.conf import settings

from django.conf.urls.static import static


urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/', include('account.urls')),

    path('meals/', MealView.as_view(), name='Meals'),

    path('history/', include('history.urls')),

    path('meals/<int:pk>/', MealView.as_view(), name='Meal-delete-get')

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # New