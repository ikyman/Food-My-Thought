from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic import views
from FMTAPIsPublic.models import UserLarder, FoodItem
from datetime import date, timedelta

User = get_user_model()

class UserLarderTestCase(TestCase): 
 def setUp(self):
  self.client = Client()  
  self.testUser = User.objects.create_user("testing@unit.test", "testPassword");  
  self.testUrl_Exten = self.testUser.url_exten
  self.client.login(email = "testing@unit.test", password = "testPassword");  
  
 def testGetOwnLarder(self):
  existing_larder = UserLarder.objects.filter(url_exten = self.testUser)
  self.assertEqual(len(existing_larder), 0, "User Created Without Crreating Larder")

  getOwnLarderResponse = self.client.get("/larder/") 
  self.assertEqual(getOwnLarderResponse.status_code, 200)
  self.assertEqual(int(getOwnLarderResponse["url_exten"]), self.testUrl_Exten)
  
  still_existing_larder = UserLarder.objects.filter(url_exten = self.testUser)
  self.assertEqual(len(still_existing_larder), 0, "No need to create a larder if all I'm doing is grabbing the Larder URL_extension from the User session token")  
  

class LarderByURLExtenTestCase(TestCase):
 def setUp(self): 
  # Create first user with larder
  self.client = Client()  
  self.testUser = User.objects.create_user("testing@unit.test", "testPassword");  
  self.testUrl_Exten = self.testUser.url_exten
  self.client.login(email = "testing@unit.test", password = "testPassword");  
  self.ownLarder = UserLarder.objects.create(url_exten=self.testUser, user_description = "Test Larder1",
                                             cat1 = "Category1: Zodiac", cat2 = "Category2: Chinese Zodiac",
                                             discontinue_date = date.today() + timedelta(days=50))
  
  # Create second user with larder
  self.otherUser = User.objects.create_user("other@unit.test", "testPassword");
  self.otherUrl_Exten = self.otherUser.url_exten
  self.otherLarder = UserLarder.objects.create(url_exten=self.otherUser, user_description = "Test Larder2",
                                               cat1 = "Category1: Cat Breed", cat2 = "Category2: Is_Canned_Tuna",
                                               discontinue_date = date.today() + timedelta(days=50))
  
  # Create third user without larder
  self.thirdUser = User.objects.create_user("third@unit.test", "testPassword");
  self.thirdUrl_Exten = self.thirdUser.url_exten
  
 def test404_OtherUserLarderDoesNotExist(self):
  # Test Case 1: 404 if URL extension doesn't exist AND user session id != that url extension
  # User 1 tries to access a non-existent larder (e.g., url_exten = 999)
  nonExistentUrlExten = 999
  response = self.client.get(f"/larder/{nonExistentUrlExten}/")
  self.assertEqual(response.status_code, 404, "Should return 404 when accessing non-existent larder that doesn't belong to user")
 
 def testSuccess_OwnLarderExists(self):
  # Test Case 2: Success if requested url_extension matches user session AND larder exists
  response = self.client.get(f"/larder/{self.testUrl_Exten}/")
  self.assertEqual(response.status_code, 200, "Should return 200 when user accesses their own existing larder")
  response_data = response.json()
  self.assertEqual(response_data["url_exten"], self.testUrl_Exten)
  self.assertEqual(response_data["display_as_owner"], True, "is_owner should be true when user accesses their own larder")
 
 def testSuccess_OtherUserLarderExists(self):
  # Test Case 3: Success if larder exists (regardless of who's asking)
  # User 1 accesses User 2's existing larder
  response = self.client.get(f"/larder/{self.otherUrl_Exten}/")
  self.assertEqual(response.status_code, 200, "Should return 200 when accessing another user's existing larder")
  response_data = response.json()
  self.assertEqual(response_data["url_exten"], self.otherUrl_Exten)
  self.assertEqual(response_data["display_as_owner"], False, "is_owner should be false when accessing another user's larder")
 
 def testSuccess_OwnLarderDoesNotExist_CreatesIt(self):
  # Test Case 4: Success if requested url_extension matches user session (even if larder doesn't exist - creates it)
  # Switch to third user (who doesn't have a larder)
  self.client.logout()
  self.client.login(email="third@unit.test", password="testPassword")
  
  # Verify larder doesn't exist
  no_larder = UserLarder.objects.filter(url_exten=self.thirdUser)
  self.assertEqual(len(no_larder), 0, "Third user should not have a larder initially")
  
  # Access own larder - should create it
  response = self.client.get(f"/larder/{self.thirdUrl_Exten}/")
  self.assertEqual(response.status_code, 201, "Should return 201 when creating larder for user accessing their own non-existent larder")
  response_data = response.json()
  self.assertEqual(response_data["url_exten"], self.thirdUrl_Exten)
  self.assertEqual(response_data["display_as_owner"], True, "is_owner should be true when user creates their own larder")
  
  # Verify larder was created
  created_larder = UserLarder.objects.filter(url_exten=self.thirdUser)
  self.assertEqual(len(created_larder), 1, "Larder should be created when user accesses their own non-existent larder")
  
class RandomLarderTestCase(TestCase): 
 def setUp(self):
  self.client = Client()
 def testRandomFilteredLarder():
  self.testUser = User.objects.create_user("testing@unit.test", "testPassword");    
  self.liveLarder = UserLarder.objects.create(url_exten=self.testUser, user_description = "Alive Larder",
                                             cat1 = "Category1: Zodiac", cat2 = "Category2: Chinese Zodiac",
                                             discontinue_date = date.today() + timedelta(days=50))
  self.deadLarder = UserLarder.objects.create(url_exten=self.testUser, user_description = "Test Larder1",
                                             cat1 = "Category1: Zodiac", cat2 = "Category2: Chinese Zodiac",
                                             discontinue_date = date.today() + timedelta(days=50))
  
  self.assertEqual(True, False, "This should test, that with 2 larders, One dead and one alive, querying for a live larder will return the live larder, and vice-versa for querying a dead larder.")
 def test404IfNotMatching():
  self.assertEqual(True, False, "Ask for a live larder when there's only dead larder, or vice-versa? Get a 404. The Front-end will then return to the home screen")
 def testTotalRandom():
  self.assertEqual(True, False, "If there's only a dead larder, return that. If there's only a live larder, return that> If there's a better way to test this total randomness, I'd like to know.")
 
  
  