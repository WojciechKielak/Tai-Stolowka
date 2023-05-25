from django.contrib import admin
from .models import Account

# Register your models here.
class imageAdmin(admin.ModelAdmin):
    list_display = ['username','email','password']

admin.site.register(Account, imageAdmin)