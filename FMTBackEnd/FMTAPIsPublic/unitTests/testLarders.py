from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic.models import UserLarder, FoodItem


User = get_user_model()

class UserLarderTestCase(TestCase): 
 def setUp(self):
  self.client = Client()  
  self.testUser = User.objects.create_user("testing@unit.test", "testPassword");  
  self.client.login("testing@unit.test", "testPassword");  
  
 def testGetOwnLarderCreate(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)
 
 def testGetOwnLarderExisting(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)

class LarderTestCase(TestCase):
 def setUp(self):
  UserLarder.objects.create(url_ext="qwerty", user_description = "Test Larder1", cat1 = "Category1: Zodiac", cat2 = "Category2: Chinese Zodiac")
  UserLarder.objects.create(user_description = "Test Larder2", cat1 = "Category1: Cat Breed", cat2 = "Category2: Is_Canned_Tuna")
  FoodItem.objects.create(name = "Undefined food", cat1_value = "Gemini", cat2_value = "Tiger",larder = "qwerty" )
  
 def testHardCategoryChange(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)
 
 def testSoftCategoryChange(self):
  print ("Hey! This should be a test")
  self.assertEqual(True, False)