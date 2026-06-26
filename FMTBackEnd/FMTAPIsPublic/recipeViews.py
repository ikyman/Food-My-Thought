from django.shortcuts import render
from django.views.decorators.http import require_POST, require_http_methods
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from .models import UserLarder, FoodItem
from django.core import serializers

@require_GET
def getRecipesForIngredient(request):
    return HttpResponse(418, "Further Implementation: WIP & TBD")

@require_GET
def getIngredientsForRecipe(request):
    return HttpResponse(418, "Further Implementation: WIP & TBD")


@require_POST
def postRecipe(request):
    return HttpResponse(418, "Further Implementation: WIP & TBD")
    """The following is the foodItem implementation. 218, but refactoring would be nice.
    218, 218! This could be used for anything Recipe-related, right? Making, Commenting, rejecting, etc
    . . . Ok, Perhaps attaching and detatching recipies could use a different view. Oh, well
    """
    """
    found_foodItem = getRequestedFooditemID(request)

    wrongUser = (not request.user.is_authenticated) or (request.POST.get("larder",None) != str(request.user.url_exten))
    larder_mismatch = found_foodItem and found_foodItem.larder.url_exten != request.user 
    
    if wrongUser or larder_mismatch:
    return HttpResponse(status = 401, reason = "Adding food to Larder User doesn't own. Blocked.")
    
    statuscode = 200 
    
    newName = request.POST["name"]
    newExpirationDate = request.POST.get("expiry_date")
    
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
    """

@require_http_methods(["DELETE"])
def deleteIngredient(request, deleted_ingredient):
    #found_foodItem = getRequestedFooditemID(request)
        
    return HttpResponse(218, "Further Implementation: WIP & TBD")