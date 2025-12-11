from django.shortcuts import render
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login, logout
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
  if User.objects.filter(email=email) :
   user = authenticate(request, username=email, password=password1)
   if user is not None:
    login(request,user)
    return HttpResponse()
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
   return HttpResponse()
  else:
   return HttpResponse(status = 401, reason = "Can't Sign in! User doesn't exist, or email/password wrong")
 else: 
  return render(request, "userManagement/csrfToken.html")#, {"form": form})

def userSignOut(request):
 logout(request)
 return HttpResponse()

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

@require_GET
def getOwnLarder(request):
 if not request.user.is_authenticated:
  return HttpResponse(status = 501, reason = "TODO: Redirect not-logged-in users to login page.")
 session_user_url_exten = request.user.url_exten
 try :
  querySet = UserLarder.objects.get(url_ext = request.user)
 except UserLarder.DoesNotExist: 
  UserLarder.objects.create(url_ext=request.user, user_description = "Description", cat1 = "Category1", cat2 = "Category2:")
  
 response = HttpResponse(status = 200)
 response["url_exten"] = session_user_url_exten
  
 return response

@require_GET
def getLarderByURLext(request, larder_url_extension):
 reqbody = request.body
 return HttpResponse( {"message": "No Larders, as SQL hasn't been set up yet. URL Extension is "+larder_url_extension}, status = 501)
