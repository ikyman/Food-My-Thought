from django.test import TestCase, Client
from django.contrib.auth import get_user_model, login
from FMTAPIsPublic import fooditemViews
from FMTAPIsPublic.models import UserLarder, FoodItem
from datetime import date, timedelta
from .fmtViewTestcase import FmtViewTestcase


class RecipeTestCase(FmtViewTestcase): 
 def setUp(self):
    super().setUp()
    (self.testUser, self.testLarder) = self.createTestLarder()
    self.noLarderUser = self.createTestUserNoLarder()
    self.testUrl_Exten = self.testUser.url_exten

    self.loginUser(self.testUser)

 def jsonTestItem(self, **kwargs):
   testRecipe = dict()
   testRecipe["id"] = ""
   testRecipe["ingredients"] = []
   testRecipe["name"] = "testRecipe"

   return testRecipe
 
 def testAddNoIngredientRecipe(self):
    self.assertEqual(True, False,"Should be impossible: How and why could that even be possible")

 def testAddRecipe(self):
    self.assertEqual(True, False,"Test both as a Proposer-guest (using Django sessions: https://github.com/ikyman/Foe-of-Fizzbuzz/issues/2) and as a Lister")
 
 def testEditRecipe(self):
    self.assertEqual(True, False,"Test both as a Proposer-guest (using Django sessions: https://github.com/ikyman/Foe-of-Fizzbuzz/issues/2) and as a Lister")
    "Proposer-guest has some actions restricted, of corse. He "

 def testMultipleIngredientRecipe(self):
    self.assertEqual(True, False,"Not Yet implemented. The getRecipesForIngredient and getIngredientsForRecipe both need to be tested, why not here? ")

 def testRecipeIngredientsWrongLarder(self):
    self.assertEqual(True, False,"Should be impossible: How and why could that even be possible")

 def testDeleteNonexistantRecipe(self):
  self.assertEqual(False,  True, "Not Yet Implemented!.")
 
 def testDelete(self):
    self.assertEqual(True, False,"Easy Testcase: the real drambuwee is in the Cascadeing! Which is in testLarders for some reason?")
    "I guess deleting the larder is the ultimate catalyst for the testcase, but recipes are most affected"


  
