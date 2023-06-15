from django.contrib import admin
from django.contrib.auth import get_user_model  # can also do from.models import User
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserAdminCreationForm, UserAdminChangeForm


User = get_user_model()


class UserAdmin(BaseUserAdmin):
    search_fields = ['email']
    list_display = ['email', 'is_active', 'staff', 'admin', 'last_login', 'timestamp']
    list_filter = ['is_active', 'staff',  'admin']
    ordering = ['email']
    filter_horizontal = []

    form = UserAdminChangeForm  
    add_form = UserAdminCreationForm 

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ()}), 
        ('Permissions', {'fields': ('admin', 'staff', 'is_active','role')})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role')
        }),
    )


admin.site.register(User, UserAdmin)

admin.site.unregister(Group)

