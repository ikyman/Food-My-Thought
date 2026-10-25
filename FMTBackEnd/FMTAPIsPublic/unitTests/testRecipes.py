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
     no_recipes = FoodItem.objects.filter()
     self.assertEqual(len(no_recipes), 0, "Initially: No Recipes")
     emptyRecipe = self.jsonTestItem()
     
     #response = self.client.post("/fooditems/", emptyRecipe) 
     self.assertEqual(response.status_code, 400, "Cannot add a Recipe without any ingredients!")

     no_recipes = FoodItem.objects.filter()
     self.assertEqual(len(no_recipes), 0, "No Recipe Added")

 def testAddRecipe(self):


    self.assertEqual(True, False,"Test both as a Proposer-guest (using Django sessions: https://github.com/ikyman/Foe-of-Fizzbuzz/issues/2) and as a Lister")
 
 def testEditRecipe(self):
    self.assertEqual(True, False,"Test both as a Proposer-guest (using Django sessions: https://github.com/ikyman/Foe-of-Fizzbuzz/issues/2) and as a Lister")
    "Proposer-guest has some actions restricted, of corse. He has to be in same session as when proposig recipes "

 def testMultipleIngredientRecipe(self):
    self.assertEqual(True, False,"Not Yet implemented. The getRecipesForIngredient and getIngredientsForRecipe both need to be tested, why not here? ")

 def testRecipeIngredientsWrongLarder(self):
    self.assertEqual(True, False,"Should be impossible: How and why could that even be possible")

 def testDeleteNonexistantRecipe(self):
  self.assertEqual(False,  True, "Not Yet Implemented!.")
 
  def testDeleteRecipe(self):
     self.assertEqual(False,  True, "Not Yet Implemented!.")

 def testDeleteFinalFooditem(self):
    self.assertEqual(True, False,"Easy Testcase: the real drambuwee is in the Cascadeing! Which is in testLarders for some reason?")
    "I guess deleting the larder is the ultimate catalyst for the testcase, but recipes are most affected"


  
