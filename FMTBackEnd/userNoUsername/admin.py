from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UsernamelessUser
from .forms import UsernamelessCreationForm

class UsernamelessAdmin(UserAdmin):
 add_form = UsernamelessCreationForm
 list_display = ["email", "url_exten"]
 list_filter = ["email","url_exten"]
 fieldsets = [
  (None, {"fields": ["email", "password"]}),
  ("Permissions", {"fields": ["is_admin"]}),
 ] 
 add_fieldsets = [
  (
   None,
   {
    "classes": ["wide"],
    "fields": ["email", "password1", "password2"],
   },
  ),
 ] 
 search_fields = ["email"]
 ordering = ["email"]
 

# Register your models here.
admin.site.register(UsernamelessUser, UsernamelessAdmin)
