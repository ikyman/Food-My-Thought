from datetime import date

from dateutil.relativedelta import relativedelta
from django.db import models
from django.contrib.auth import get_user_model, login

User = get_user_model()

RECIPE_TEXTFIELD_MAX_LENGTH = 2500  #2500: Around the Length of the Martha Stewart Cheesecake Recipe.
# I lied! I'm using Charfields. I could be wrong, but it doesn't look like textfields have character limits.
# I don't want my database gg-skrubed by a massive wall of text.

def default_larder_expiration():
 return date.today() + relativedelta(years=1, months = 6)

# Create your models here.
class UserLarder(models.Model):
 #cognito_sub = models.CharField()
 url_exten = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
 user_description = models.TextField()
 cat1 = models.CharField(max_length=30)
 cat2 = models.CharField(max_length=30)
 discontinue_date = models.DateField(default=default_larder_expiration)

class FoodItem(models.Model):
 id = models.AutoField(primary_key=True)
 name = models.CharField(max_length=100)
 estimated_expiration_date = models.DateField(null=True, blank=True)
 cat1_value = models.CharField(max_length=30, default = "")
 cat2_value = models.CharField(max_length=30, default = "")
 larder = models.ForeignKey(UserLarder, on_delete=models.CASCADE, related_name='food_items')

class Recipe(models.Model):
    #id = models.AutoField(primary_key=True) # Commented out: I think Django does this automatically
    name = models.CharField(max_length=100)
    comment_comment = models.CharField(max_length = RECIPE_TEXTFIELD_MAX_LENGTH) #2500: Around the Length of the Martha Stewart Cheesecake Recipe.
    comment_response = models.CharField(max_length = RECIPE_TEXTFIELD_MAX_LENGTH)
    ok = models.BooleanField()
    
    ingredients = models.ManyToManyField(FoodItem)
