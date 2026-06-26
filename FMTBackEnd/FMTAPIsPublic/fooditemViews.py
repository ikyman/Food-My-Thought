from django.shortcuts import render
from django.views.decorators.http import require_POST, require_http_methods
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from .models import UserLarder, FoodItem
from django.core import serializers

def getRequestedFooditemID(request):
    found_foodItem = None
    fooditem_id = request.POST.get("id")
    byIDQuerySet = []

    if fooditem_id:
        byIDQuerySet = list(FoodItem.objects.filter(id = int(fooditem_id) ))
    if len(byIDQuerySet):
        found_foodItem = byIDQuerySet[0]

    return found_foodItem

@require_POST
def postFooditem(request):
 found_foodItem = getRequestedFooditemID(request)

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
  if "expiry_date" in request.POST: found_foodItem.estimated_expiration_date = newExpirationDate
  if newCat1Value: found_foodItem.cat1_value = newCat1Value
  if newCat2Value: found_foodItem.cat2_value = newCat2Value
 found_foodItem.save()  
 return JsonResponse(model_to_dict(found_foodItem), status = statuscode) 

@require_http_methods(["DELETE"])
def deleteFooditem(request, deleted_fooditem):
    #found_foodItem = getRequestedFooditemID(request)
        
    return HttpResponse(218, "Further Implementation: WIP & TBD")