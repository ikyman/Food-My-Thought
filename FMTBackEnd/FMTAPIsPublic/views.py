from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from .models import UserLarder, FoodItem, default_larder_expiration
from datetime import date, timedelta
from django.core import serializers


User = get_user_model()
# Create your views here.

def userSignUp(request):
 print(request.method)
 if request.method == "POST":
  email = request.POST["email"]
  password1 = request.POST["password1"]
  password2 = request.POST["password2"]
  if User.objects.filter(email=email) :
   user = authenticate(request, username=email, password=password1)
   if user is not None:
    login(request,user)
    return JsonResponse( {"url_exten" : user.url_exten } )
   else:
    return HttpResponse(status = 401, reason = "A User with that E-mail already Exists")   
  if password1 != password2:
   return HttpResponse(status = 401, reason = "Passwords do not match")
  User.objects.create_user(email, password1)
  print("User " + email + "Created")
  return HttpResponse()
 else:
  return render(request, "userManagement/csrfToken.html")#, {"form": form})

def userSignIn(request):
 if request.method == "POST":
  email = request.POST["email"]
  password = request.POST["password"]
  user = authenticate(request, username=email, password=password)
  if user is not None:
   login(request,user)
   return JsonResponse( {"url_exten" : user.url_exten } )
  else:
   return HttpResponse(status = 401, reason = "Can't Sign in! User doesn't exist, or email/password wrong")
 else: 
  return render(request, "userManagement/csrfToken.html")#, {"form": form})

def userSignOut(request):
 logout(request)
 return HttpResponse()

@require_GET
def getRandomLarder(request):
 randomization_preference = request.GET.get( "randomness-level", "only-live")
 if randomization_preference == "only-live":
  foundLarders = UserLarder.objects.filter(discontinue_date__gte = date.today() )
 elif randomization_preference == "only-dead":
  foundLarders = UserLarder.objects.filter(discontinue_date__lt = date.today() )
 elif randomization_preference == "total-random":
  foundLarders = UserLarder.objects.filter()
 else:
  return HttpResponse("Unknown Randomization Preference '" + randomization_preference + "'", status = 400)
 randomSelectedLarder = foundLarders.order_by("?").first()
 if randomSelectedLarder == None:
    return HttpResponse(status = 404)

 return  JsonResponse({"url_exten" : randomSelectedLarder.url_exten.url_exten} , status = 200)

@require_GET
def getOwnLarder(request):
 if not request.user.is_authenticated:
  return HttpResponse(status = 501, reason = "Not Logged in; Anonymous larders not supported.")
 session_user_url_exten = request.user.url_exten

 response = HttpResponse(status = 200)
 response["url_exten"] = session_user_url_exten
  
 return response

@require_GET
def getLarderByURLext(request, url_exten):
 QueryingOwn = False 
 if request.user.is_authenticated:
  QueryingOwn = url_exten == request.user.url_exten 
 
 statuscode = 200
 responseJSONBody = dict()
 responseJSONBody["display_as_owner"] = QueryingOwn
 foundLarder = None
 try:
  foundLarder = UserLarder.objects.get(url_exten = url_exten)
 except UserLarder.DoesNotExist:
  if QueryingOwn:
   foundLarder = UserLarder(url_exten = request.user)
   foundLarder.save()
   statuscode = 201
  else:
   statuscode = 404
 except:
  statuscode = 500
 
 if statuscode >=300:
  return HttpResponse(status=statuscode)
 
 responseJSONBody["url_exten"] = foundLarder.url_exten.url_exten
 responseJSONBody["user_description"] = foundLarder.user_description
 responseJSONBody["cats"] = (foundLarder.cat1, foundLarder.cat2)
 responseJSONBody["live"] = QueryingOwn or foundLarder.discontinue_date > date.today()
 responseJSONBody["fooditems"] = list(map (model_to_dict, FoodItem.objects.filter(larder = foundLarder)  ) )
  
 return  JsonResponse(responseJSONBody, status = statuscode)

@require_POST
def postFoodItem(request):
 fooditem_id = request.POST.get("id")
 byIDQuerySet = []
 if fooditem_id: byIDQuerySet = list(FoodItem.objects.filter(id = int(fooditem_id) ))
 found_foodItem = None
 if len(byIDQuerySet):
  found_foodItem = byIDQuerySet[0]

 wrongUser = (not request.user.is_authenticated) or (request.POST.get("larder",None) != str(request.user.url_exten))
 larder_mismatch = found_foodItem and found_foodItem.larder.url_exten != request.user 
 
 if wrongUser or larder_mismatch:
  return HttpResponse(status = 401, reason = "Adding food to Larder User doesn't own. Blocked.")
 
 statuscode = 200 
 
 newName = request.POST["name"]
 newExpirationDate = request.POST.get("expiry_date")
 newCat1Value = request.POST.get("cat1", "")
 newCat2Value = request.POST.get("cat2", "")
 
 if not found_foodItem:
  foundLarder = UserLarder.objects.get(url_exten=request.user.url_exten)
  found_foodItem = FoodItem(larder = foundLarder, name = newName, estimated_expiration_date = newExpirationDate or None, cat1_value = newCat1Value, cat2_value = newCat2Value)
  statuscode = 201 
 else:
  if newName: found_foodItem.name = newName
  if "expiry_date" in request.POST: found_foodItem.estimated_expiration_date = newExpirationDate or None
  if newCat1Value: found_foodItem.cat1_value = newCat1Value
  if newCat2Value: found_foodItem.cat2_value = newCat2Value
 found_foodItem.save()  
 return JsonResponse(model_to_dict(found_foodItem), status = statuscode) 
