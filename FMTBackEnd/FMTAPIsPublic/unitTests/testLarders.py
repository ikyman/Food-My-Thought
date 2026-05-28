from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic import larderViews
from FMTAPIsPublic.models import UserLarder, FoodItem
from datetime import date, timedelta
from .fmtViewTestcase import FmtViewTestcase

User = get_user_model()

class UserLarderTestCase(FmtViewTestcase): 
 def setUp(self):
  super().setUp()
  self.testUser = self.createTestUserNoLarder()
  self.loginUser(self.testUser) 
  
 def testGetOwnLarder(self):
  no_larder_created = UserLarder.objects.filter(url_exten = self.testUser)
  self.assertEqual(len(no_larder_created), 0, "User Creation on its own should not Create a Larder")

  getOwnLarderResponse = self.client.get("/larder/") 
  self.assertEqual(getOwnLarderResponse.status_code, 200)
  self.assertEqual(int(getOwnLarderResponse["url_exten"]), self.testUser.url_exten)
  
  no_larder_created = UserLarder.objects.filter(url_exten = self.testUser)
  self.assertEqual(len(no_larder_created), 0, "No need to create a larder if all I'm doing is grabbing the Larder URL_extension from the User session token")  
  

class LarderByURLExtenTestCase(FmtViewTestcase):
 def setUp(self): 
  super().setUp()
  (self.testUser, self.testLarder) = self.createTestLarder()
  self.testUrl_Exten = self.testUser.url_exten
  # Create second user with larder
  (self.otherUser, self.otherLarder) = self.createTestLarder()
  self.otherUrl_Exten = self.otherUser.url_exten
  
  # Create third user without larder
  self.noLarderUser = self.createTestUserNoLarder()
  self.noLarderUserUrl_Exten = self.noLarderUser.url_exten

  self.loginUser(self.testUser)
  
 def test404_OtherUserLarderDoesNotExist(self):
  # Test Case 1: 404 if URL extension doesn't exist AND user session id != that url extension
  # User 1 tries to access a non-existent larder (e.g., url_exten = 999)
  nonExistentUrlExten = 999
  response = self.client.get(f"/larders/url-extension/{nonExistentUrlExten}/")
  self.assertEqual(response.status_code, 404, "Should return 404 when accessing non-existent larder that doesn't belong to user")
 
 def testSuccess_OwnLarderExists(self):
  # Test Case 2: Success if requested url_extension matches user session AND larder exists
  response = self.client.get(f"/larders/url-extension/{self.testUrl_Exten}/")
  self.assertEqual(response.status_code, 200, "Should return 200 when user accesses their own existing larder")
  response_data = response.json()
  self.assertEqual(response_data["url_exten"], self.testUrl_Exten)
  self.assertEqual(response_data["display_as_owner"], True, "is_owner should be true when user accesses their own larder")
 
 def testSuccess_OtherUserLarderExists(self):
  # Test Case 3: Success if larder exists (regardless of who's asking)
  # User 1 accesses User 2's existing larder
  response = self.client.get(f"/larders/url-extension/{self.otherUrl_Exten}/")
  self.assertEqual(response.status_code, 200, "Should return 200 when accessing another user's existing larder")
  response_data = response.json()
  self.assertEqual(response_data["url_exten"], self.otherUrl_Exten)
  self.assertEqual(response_data["display_as_owner"], False, "is_owner should be false when accessing another user's larder")
 
 def testSuccess_OwnLarderDoesNotExist_CreatesIt(self):
  # Test Case 4: Success if requested url_extension matches user session (even if larder doesn't exist - creates it)
  # Switch to third user (who doesn't have a larder)
  self.client.logout()
  self.loginUser(self.noLarderUser)
  # Verify larder doesn't exist
  no_larder = UserLarder.objects.filter(url_exten=self.noLarderUser)
  self.assertEqual(len(no_larder), 0, "Third user should not have a larder initially")
  
  # Access own larder - should create it
  response = self.client.get(f"/larders/url-extension/{self.noLarderUserUrl_Exten}/")
  self.assertEqual(response.status_code, 201, "Should return 201 when creating larder for user accessing their own non-existent larder")
  response_data = response.json()
  self.assertEqual(response_data["url_exten"], self.noLarderUserUrl_Exten)
  self.assertEqual(response_data["display_as_owner"], True, "is_owner should be true when user creates their own larder")
  
  # Verify larder was created
  created_larder = UserLarder.objects.filter(url_exten=self.noLarderUser)
  self.assertEqual(len(created_larder), 1, "Larder should be created when user accesses their own non-existent larder")
  
class RandomLarderTestCase(FmtViewTestcase): 
 def setUp(self):
  super().setUp()
 def testRandomFilteredLarder(self):
  """Test, that with 2 larders, One dead and one alive, querying for a live larder will return the live larder, and vice-versa for querying a dead larder. """
  (liveUser1, liveLarder1)  = self.createTestLarder()
  (deadUser1, deadLarder1) = self.createTestLarder(discontinuation = date.today() - timedelta(days=50))

  live_larder_queried = self.client.get("/larders/url-extension/")
  dead_larder_queried = self.client.get("/larders/url-extension/", query_params={ "randomness-level" : "only-dead"})
  
  self.assertEqual(live_larder_queried.status_code, 200)
  self.assertEqual(live_larder_queried.json()["url_exten"], liveUser1.url_exten, "Random live Larder querying could not find existing live larder")
  self.assertEqual(dead_larder_queried.status_code, 200)
  self.assertEqual(dead_larder_queried.json()["url_exten"], deadUser1.url_exten, "Random dead Larder querying could not find existing dead larder")

 def test404IfNotMatching(self):
    (deadUser1, deadLarder1)  = self.createTestLarder(discontinuation = date.today() - timedelta(days=50))
    live_larder_queried = self.client.get("/larders/url-extension/")
    self.assertEqual(live_larder_queried.status_code, 404, "Live larder query should not return dead larders if no live larders exist")

    self.deleteTestUser(deadUser1.url_exten)

    (liveUser1, liveLarder1)   = self.createTestLarder()
    dead_larder_queried = self.client.get("/larders/url-extension/", query_params = { "randomness-level" : "only-dead"})
    self.assertEqual(dead_larder_queried.status_code, 404, "Dead larder query should not return live larders if no dead larders exist")

 def testTotalRandom(self):
  """If there's only a dead larder, return that. If there's only a live larder, return that> If there's a better way to test this total randomness, I'd like to know."""
  (deadUser1, deadLarder1)  = self.createTestLarder(discontinuation = date.today() - timedelta(days=50))
  random_query = self.client.get("/larders/url-extension/", query_params={ "randomness-level" : "total-random"})

  self.assertEqual(random_query.status_code, 200)
  self.assertEqual(random_query.json()["url_exten"], deadUser1.url_exten, "Full Random should be able to return dead larders")
  self.deleteTestUser(deadUser1.url_exten)

  (liveUser1, liveLarder1)   = self.createTestLarder()
  random_query = self.client.get("/larders/url-extension/", query_params={ "randomness-level" : "total-random"})
  
  self.assertEqual(random_query.status_code, 200)
  self.assertEqual(random_query.json()["url_exten"], liveUser1.url_exten, "Full Random should be able to return live larders")
  self.deleteTestUser(liveUser1.url_exten)

  random_query = self.client.get("/larders/url-extension/", { "randomness-level" : "total-random"})
  self.assertEqual(random_query.status_code, 404, "Full random returns 404 if no Larders exist")
