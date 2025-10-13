from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UsernamelessUser

# Register your models here.

admin.site.register(UsernamelessUser, UserAdmin)
