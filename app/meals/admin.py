from django.contrib import admin
from .models import Meal

# Register your models here.
class imageAdmin(admin.ModelAdmin):
    list_display = ['nazwa','opis','photo']

admin.site.register(Meal, imageAdmin)