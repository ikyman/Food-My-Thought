from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UsernamelessUser
from .forms import UsernamelessCreationForm

class UsernamelessAdmin(UserAdmin):
 add_form = UsernamelessCreationForm
 
 search_fields = ["email"]
 ordering = ["email"]
 list_display = ["email", "url_exten"]
 list_filter = ["email","url_exten"]
 

# Register your models here.
admin.site.register(UsernamelessUser, UsernamelessAdmin)
