from django.db import models
from django.contrib.auth import get_user_model, login

User = get_user_model()

# Create your models here.
class UserLarder(models.Model):
 #cognito_sub = models.CharField()
 url_exten = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
 user_description = models.TextField()
 cat1 = models.CharField(max_length=30)
 cat2 = models.CharField(max_length=30)
 discontinue_date = models.DateField()

class FoodItem(models.Model):
 id = models.AutoField(primary_key=True)
 name = models.CharField(max_length=100,)
 estimated_expiration_date = models.DateField()
 cat1_value = models.CharField(max_length=30, default = "")
 cat2_value = models.CharField(max_length=30, default = "")
 larder = models.ForeignKey(UserLarder, on_delete=models.CASCADE, related_name='food_items')