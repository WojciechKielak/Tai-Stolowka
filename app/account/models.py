from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
# Create your models here.
#write manager for custom user
class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have an password")
        if not username:
            raise ValueError("Users must have an username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password) #creates hashed version of the passed password
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password):# do we need superuser?
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have an password")
        if not username:
            raise ValueError("Users must have an username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user = self.create_user(
            email = self.normalize_email(email),
            password=password,
            username=username
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser , PermissionsMixin):
    email               = models.EmailField(verbose_name="email", max_length=60, unique=True)
    #required to create custom user
    username            = models.CharField(max_length=30, unique=True)
    date_joined         = models.DateTimeField(verbose_name="date Joined", auto_now_add=True)
    last_login          = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin            = models.BooleanField(default=False)
    is_active           = models.BooleanField(default=True)
    is_staff            = models.BooleanField(default=False)
    is_superuser        = models.BooleanField(default=False)
    
    USERNAME_FIELD = "email" #by what you whant to log in
    REQUIRED_FIELDS = ["username"]

    objects = MyAccountManager()# overwrite default manager

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True