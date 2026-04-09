from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from FMTAPIsPublic.models import default_larder_expiration


User = get_user_model()


class FmtViewTestcase(TestCase):
 larder_count = 1
 def createTestLarder(self, user_description = "Test Larder" + str(larder_count), discontinuation = None  ):

  
  created_user = User.objects.create_user("testing" + str(larder_count) + "@unit.test", "testPassword" + str(larder_count))
  created_larder = UserLarder(url_exten = self.testUser,
                              user_description = user_description,
                              discontinue_date = default_larder_expiration,
                              )
  self.testLarder.save()
  
  FmtViewTestcase.larder_count += 1
   
  return (created_user, created_larder)
 
 
 def setUp(self):
  self.client = Client()    
 