from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models

class User(AbstractUser):
    CUSTOMER = 1
    ADMIN = 2
        
    ROLE_CHOICES = (
        (CUSTOMER, 'customer'),
        (ADMIN, 'admin')
    )
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='account_users', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='account_users', blank=True)
   