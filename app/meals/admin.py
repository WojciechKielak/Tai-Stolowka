from django.contrib import admin
from .models import Meal


class imageAdmin(admin.ModelAdmin):
    list_display = ['nazwa','opis','cena','photo']

admin.site.register(Meal, imageAdmin)