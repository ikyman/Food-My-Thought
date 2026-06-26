from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from FMTAPIsPublic.models import default_larder_expiration
from FMTAPIsPublic.models import UserLarder


User = get_user_model()


class FmtViewTestcase(TestCase):
 user_count = 1

 def loginUser(self, logging_in_user):
    (user_email, user_password) = self.testUsersPasswords[logging_in_user.url_exten]
    self.client.login(email = user_email, password = user_password)
    
    return "TODO: Shouldn't this return value have something to do with log-in success?"
 
 def createTestUserNoLarder(self):
    user_email = "testing" + str(FmtViewTestcase.user_count) + "@unit.test"
    user_password = "testPassword" + str(FmtViewTestcase.user_count)
    created_user = User.objects.create_user(user_email, user_password)

    self.testUsersPasswords[created_user.url_exten] = (user_email, user_password)
    FmtViewTestcase.user_count += 1

    return created_user
   
 def createTestLarder(self, user_description = None, discontinuation = None  ):
    if user_description == None:
        user_description = "Test Larder" + str(FmtViewTestcase.user_count)
    created_user = self.createTestUserNoLarder()

    if (discontinuation == None):
      discontinuation = default_larder_expiration()

    created_larder = UserLarder(url_exten = created_user,
                                user_description = user_description,
                                discontinue_date = discontinuation,
                                )
    created_larder.save()

    return (created_user, created_larder)

 def deleteTestUser(self, url_exten):
   self.testUsersPasswords.pop(url_exten)

   user = User.objects.get(url_exten = url_exten)

   user.delete() # ON DELETE CASCADE: Deleting the user is all that matters
 
 def jsonTestItem(self, **kwargs):
   raise "Calling Abstract function outside of sub-class overloading!"

 def creation201200test(self, url_slug, added_item_name):
   addedJSONItem = self.jsonTestItem()

   response = self.client.post(url_slug, addedFoodItem) 
   self.assertEqual(response.status_code, 201, "Should return 201 when creating a new " + added_item_name)

   pass
  
 def logInRequiredTest(self, clientHTTPMethod, url_slug, httpRequestData = None):
  # While logged out
  self.client.logout()
  response = clientHTTPMethod(url_slug, httpRequestData)
  self.assertEqual(response.status_code, 401 , "Cannot Use API Endpoint" + url_slug + "When not logged in")

  # While logged in as different user
  unauthUser = self.createTestUserNoLarder()
  self.loginUser(unauthUser)
  
  response = clientHTTPMethod(url_slug, httpRequestData)
  self.assertEqual(response.status_code, 401 , "API Endpoint" + url_slug + "unavailable to foreign users")
    
 def setUp(self):
  self.client = Client()
  self.testUsersPasswords = dict();
 