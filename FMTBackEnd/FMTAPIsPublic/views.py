from django.shortcuts import render
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

# Create your views here.

@csrf_exempt
def testPost(request):
 print(request.method)
 if request.method == "POST":
  print("tested with input" + str(request.headers) + "success\n")
  
  print("\nbody ist" + str(request.text) + "\n")
  return (HttpResponse(request))
 else:
  return render(request, "userManagement/signin.html")#, {"form": form}) 

def userSignUp(request):
 print(request.method)
 if request.method == "POST":
  email = request.POST["email"]
  password1 = request.POST["password1"]
  password2 = request.POST["password2"]
  formUserCreated = UsernamelessCreationForm (email, password1, password2)
  formUserCreated.save(formUserCreated)
  print("User " + email + "Created")
 else:
  return render(request, "userManagement/signup.html")#, {"form": form})

def userSignIn(request):
 if request.method == "POST":
  email = request.POST["email"]
  password = request.POST["password"]
  print("email", email, "Password leakage:", password)
  user = authenticate(request, username=username, password=password)
  if user is not None:
   login(request,user)
  else:
   return HttpResponse("Can't Sign in! User doesn't exist, or email/password wrong")
 else: 
  return render(request, "userManagement/signin.html")#, {"form": form})
 

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