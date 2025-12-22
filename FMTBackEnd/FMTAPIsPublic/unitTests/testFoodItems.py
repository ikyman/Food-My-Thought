from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic import views
from FMTAPIsPublic.models import UserLarder, FoodItem
from datetime import date, timedelta

User = get_user_model()

class FoodItemTestCase(TestCase): 
 def setUp(self):
  self.client = Client()  
  self.testUser = User.objects.create_user("testing@unit.test", "testPassword"); 
  self.otherUser = User.objects.create_user("other@unit.test", "testPassword");  
  self.testLarder = UserLarder(url_exten = self.testUser, discontinue_date = date.today() + timedelta(days = 42069))
  
  self.testUrl_Exten = self.testUser.url_exten
  self.client.login(email = "testing@unit.test", password = "testPassword");
  
 
 def testAddFoodItem(self):
  no_food = FoodItem.objects.filter()
  self.assertEqual(len(no_food), 0, "Initially: No Food Items")
  addedFoodItem = dict()
  addedFoodItem["larder"] = self.testUrl_Exten
  addedFoodItem["name"] = "testFood"
  
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 201, "Should return 201 when creating a new FoodItem")
  
  nowFood = FoodItem.objects.filter(name = "testFood")
  
  self.assertEqual(len(no_food), 1, "Food Should be added")
  
 def testEditFoodItem(self):
  addedFoodItem = dict()
  addedFoodItem["larder"] = self.testUrl_Exten
  addedFoodItem["name"] = "testFood"
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 201, "Can't Edit a FoodItem if there's no FoodItem to begin with!")
 
  editedResponseFood = response.json()
  editedResponseFood["name"] = "differentName"
  
  self.client.post("/fooditems/", editedResponseFood) 
  self.assertEqual(response.status_code, 200, "Response code should be 200")
  
  
  editedFood = FoodItem.objects.filter(name = "testFood")
  
  self.assertEqual(len(editedFood), 1, "Food's Name should be changed")
  
  no_added_food = FoodItem.objects.filter()
  self.assertEqual(len(no_added_food), 0, "Food is edited, and not added")

  
 def testAddFoodItemToWrongLarder(self):
  no_food = FoodItem.objects.filter()
  self.assertEqual(len(no_food), 0, "Initially: No Food Items")
  addedFoodItem = dict()
  addedFoodItem["name"] = "testFood"
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 401 , "Need a Larder to add any food")
  
  self.client.logout()
  self.client.login(email="other@unit.test", password="testPassword")
  addedFoodItem["larder"] = self.testUrl_Exten
  
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 401 , "Can't add food to a larder you don't own")
