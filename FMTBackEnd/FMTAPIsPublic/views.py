from django.shortcuts import render
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, get_user_model
from django.http import HttpResponse
from .models import UserLarder

User = get_user_model()
# Create your views here.

def userSignUp(request):
 print(request.method)
 if request.method == "POST":
  email = request.POST["email"]
  password1 = request.POST["password1"]
  password2 = request.POST["password2"]
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
   return HttpResponse()
  else:
   return HttpResponse(status = 401, reason = "Can't Sign in! User doesn't exist, or email/password wrong")
 else: 
  return render(request, "userManagement/csrfToken.html")#, {"form": form})
 

@require_GET
def getRandomLarder(request, randomization_preference = "live-only"):
 if randomization_preference == "live-only":
  pass
 elif randomization_preference == "dead-only":
  pass
 elif randomization_preference == "true-random":
  pass
 else:
  return HttpResponse("Unknown Randomization Preference '" + randomization_preference + "'", status_code = 400)
 objet = {"Keyboard":"qwertyuip",
          "number":9,
          "phone":"androidn"}
 print(HttpResponse(objet).headers)
 return HttpResponse(objet)

#@api_view(http_method_names=['GET'])
def getLarderByURLext(request, larder_url_extension):
 reqbody = request.body

 return HttpResponse({"message": "No Larders, as SQL hasn't been set up yet. URL Extension is "+larder_url_extension})

#def homeScreen(request):
 #return render(request, "appHTMLs/homeScreen.html")


#def fromFPSView(request, FramesPerSecond):
 #isFloat = stringIsFloat(FramesPerSecond)
 #if not isFloat:
  #return None
 #FramesPerSecond=float(FramesPerSecond)
 #if FramesPerSecond <=0:
  #return None
 #frameLength = 1/FramesPerSecond
 #return HttpResponse(round(frameLength, 3))