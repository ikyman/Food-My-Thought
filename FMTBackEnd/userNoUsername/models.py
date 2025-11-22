from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# Create your models here.
class UsernamelessUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password):
        user = self.create_user(email,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user        

class UsernamelessUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    url_exten = models.BigAutoField(primary_key=True)
    
    is_staff = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = UsernamelessUserManager()
