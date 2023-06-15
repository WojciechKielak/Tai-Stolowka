from django.contrib import admin
from .models import History, CartItem
from account.models import User
from meals.models import Meal


admin.site.register(History)
admin.site.register(CartItem)