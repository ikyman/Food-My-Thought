from django.shortcuts import render
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.http import HttpResponse, JsonResponse


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
