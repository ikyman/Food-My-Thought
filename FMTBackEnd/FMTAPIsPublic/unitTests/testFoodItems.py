from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic import fooditemViews
from FMTAPIsPublic.models import UserLarder, FoodItem
from datetime import date, timedelta
from .fmtViewTestcase import FmtViewTestcase


class FoodItemTestCase(FmtViewTestcase): 
 def setUp(self):
    super().setUp()
    (self.testUser, self.testLarder) = self.createTestLarder()
    self.noLarderUser = self.createTestUserNoLarder()
    self.testUrl_Exten = self.testUser.url_exten

    self.loginUser(self.testUser)

 def jsonTestItem(self, **kwargs):
   testFoodItem = dict()
   testFoodItem["id"] = ""
   testFoodItem["larder"] = self.testUrl_Exten
   testFoodItem["name"] = "testFood"

   return testFoodItem
 
 def testAddFoodItem(self):
  no_food = FoodItem.objects.filter()
  self.assertEqual(len(no_food), 0, "Initially: No Food Items")
  addedFoodItem = self.jsonTestItem()
  
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 201, "Should return 201 when creating a new FoodItem")
    
  nowFood = FoodItem.objects.filter(name = addedFoodItem["name"])
  
  self.assertEqual(len(nowFood), 1, "Food Should be added")
  
 def testEditFoodItem(self):
  addedFoodItem = self.jsonTestItem()
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 201, "Can't Edit a FoodItem if there's no FoodItem to begin with!")
 
  editedResponseFood = response.json()
  editedResponseFood["name"] = "differentName"
  
  response = self.client.post("/fooditems/", editedResponseFood) 
  self.assertEqual(response.status_code, 200, "Response code should be 200")
  
  editedFood = FoodItem.objects.filter(name = "differentName")
  
  self.assertEqual(len(editedFood), 1, "Food's Name should be changed")
  
  no_added_food = FoodItem.objects.filter()
  self.assertEqual(len(no_added_food), 1, "Food is edited, and not added")

  
 def testAddFoodItemToWrongLarder(self):
  no_food = FoodItem.objects.filter()
  self.assertEqual(len(no_food), 0, "Initially: No Food Items")
  addedFoodItem = self.jsonTestItem()
  del addedFoodItem["larder"]
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 401 , "Posting fooditems requires a Larder ID to validate user permissions")
  
  addedFoodItem["larder"] = self.testUrl_Exten
  self.logInRequiredTest(self.client.post, "/fooditems/", addedFoodItem)
  
 def testGetFoodViaLarderLoading(self):
  addedFoodItem = self.jsonTestItem()
  response = self.client.post("/fooditems/", addedFoodItem) 
  self.assertEqual(response.status_code, 201, "Can't Load a FoodItem if there's no FoodItem to begin with!")  
  
  response = self.client.get(f"/larders/url-extension/{self.testUrl_Exten}/")
  self.assertEqual(response.status_code, 200, "Should return 200 when user accesses their own existing larder")
  response_data = response.json()
  
  self.assertEqual(len(response_data["fooditems"]), 1, "We added only 1 fooditem.")
  self.assertEqual(response_data["fooditems"][0]["name"],  "testFood", "We added the 'testFood' Fooditem.")
  
 def testDeleteFoodItemWrongLarder(self):
  deletable_fooditem = self.jsonTestItem()
  response = self.client.post("/fooditems/", deletable_fooditem) 

  deletable_fooditem_id = response.json()["id"]
  self.logInRequiredTest(self.client.delete, "/fooditems/delete/" + str(deletable_fooditem_id))

 def testDeleteNonexistantFoodItem(self):
  self.assertEqual(False,  True, "Not Yet Implemented!.")

 def testDelete(self):
  self.assertEqual(False,  True, "Not Yet Implemented!.")


  
