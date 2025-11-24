from django.db import models

def get_next_url():
 pass
 
# Create your models here.

class UserLarder(models.Model):
 #cognito_sub = models.CharField()
 url_ext = models.CharField(max_length=10, primary_key=True, default=get_next_url())
 user_description = models.TextField()
 cat1 = models.CharField(max_length=30)
 cat2 = models.CharField(max_length=30)
 discontinue_date = models.DateField()

class FoodItem(models.Model):
 id = models.AutoField(primary_key=True)
 name = models.CharField(max_length=100)
 estimated_expiration_date = models.DateField()
 cat1_value = models.CharField(max_length=30)
 cat2_value = models.CharField(max_length=30)
 larder = models.ForeignKey(UserLarder, on_delete=models.CASCADE, related_name='food_items')