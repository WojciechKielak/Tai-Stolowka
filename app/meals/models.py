from django.db import models
from urllib.request import urlopen
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

# Create your models here.
class Meal(models.Model):
    nazwa = models.CharField(max_length=20)
    opis = models.CharField(max_length=100, default="Dodaj opis :D")
    cena = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    photo = models.ImageField(upload_to='')