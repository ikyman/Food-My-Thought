from django.test import TestCase, Client

User = get_user_model()


class FmtViewTestcase(TestCase):
 larder_count = 1;
 def createTestLarder(self, user_description = "Test Larder" + larder_count, time_until_discontinuation = timedelta(50)  ):

  
  created_user = User.objects.create_user("testing" + larder_count + "@unit.test", "testPassword")
  created_larder = UserLarder(url_exten = self.testUser,
                              user_description = user_description,
                              discontinue_date = date.today() + time_until_discontinuation,
                              cat1)
  self.testLarder.save()
  
  FmtViewTestcase.larder_count += 1
   
  return (created_user, created_larder)
 
 
 def setUp(self):
  self.client = Client()    
 