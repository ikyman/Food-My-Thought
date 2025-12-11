from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic import views
from FMTAPIsPublic.models import UserLarder, FoodItem


User = get_user_model()

class UserLarderTestCase(TestCase): 
 def setUp(self):
  self.client = Client()  
  self.testUser = User.objects.create_user("testing@unit.test", "testPassword");  
  self.testUrl_Exten = self.testUser.url_exten
  self.client.login(email = "testing@unit.test", password = "testPassword");  
  
 def testGetOwnLarderCreate(self):
  self.assertEqual(User.objects.get(email="testing@unit.test").url_exten, self.testUrl_Exten)
  no_existing_larder = UserLarder.objects.filter(url_ext = self.testUser)
  self.assertEqual(len(no_existing_larder), 0)

  getOwnLarderResponse = self.client.get("/larder/") 
  self.assertEqual(getOwnLarderResponse.status_code, 200)
  self.assertEqual(getOwnLarderResponse["url_exten"], self.testUrl_Exten)
  
  now_existing_larder = UserLarder.objects.filter(url_ext = self.testUser)
  self.assertEqual(len(now_existing_larder), 1)  
  
 
 def testGetOwnLarderExisting(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)

class LarderTestCase(TestCase):
 def setUp(self):
  return 
  UserLarder.objects.create(url_ext="qwerty", user_description = "Test Larder1", cat1 = "Category1: Zodiac", cat2 = "Category2: Chinese Zodiac")
  UserLarder.objects.create(user_description = "Test Larder2", cat1 = "Category1: Cat Breed", cat2 = "Category2: Is_Canned_Tuna")
  FoodItem.objects.create(name = "Undefined food", cat1_value = "Gemini", cat2_value = "Tiger",larder = "qwerty" )
  
 def testHardCategoryChange(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)
 
 def testSoftCategoryChange(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)