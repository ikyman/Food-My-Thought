from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from .models import UserLarder, FoodItem, default_larder_expiration
from datetime import date
from django.core import serializers

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
 if request.user.is_authenticated:
  session_user_url_exten = request.user.url_exten
 else:
  session_user_url_exten = -1

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