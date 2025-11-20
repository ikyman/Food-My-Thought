from django.test import TestCase

# Create your tests here.

class TestTesting(TestCase):
 def FailingTestcase():
  print ("Hey! This should be a test")
  self.assertEqual(True, False)
