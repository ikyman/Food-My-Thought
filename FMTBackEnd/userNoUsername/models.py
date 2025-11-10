from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class UsernamelessUser(AbstractUser):
    email = models.CharField( max_length = 255, unique = True)
    url_exten = models.BigAutoField( primary_key = True )
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
