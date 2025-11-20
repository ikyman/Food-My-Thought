from django.test import TestCase
from . import models

class LarderTestCase(TestCase):
 def setUpTestData():
  UserLarder.objects.create(url_ext="qwerty", user_description = "Test Larder1", cat1 = "Category1: Zodiac", cat2 = "Category2: Chinese Zodiac")
  UserLarder.objects.create(user_description = "Test Larder2", cat1 = "Category1: Cat Breed", cat2 = "Category2: Is_Canned_Tuna")
  FoodItem.objects.create(name = "Undefined food", cat1_value = "Gemini", cat2_value = "Tiger",larder = "qwerty" )
  
  
 def testHardCategoryChange():
  print ("Hey! This should be a test")
  self.assertEqual(True, False)
 
 def testSoftCategoryChange():
  pass