"""FPSBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('usrs/signin/', views.userSignIn),
    path('usrs/signout/', views.userSignOut),  
    path('usrs/signup/', views.userSignUp),  
    
    path('larder/', views.getOwnLarder),
    path('larders/url-extension/<int:url_exten>/', views.getLarderByURLext),
    path('larders/url-extension/', views.getRandomLarder),

    
    path(r'fooditems/', views.postFoodItem),
    
    #path(r'recipes/<str:larder-url-extension>/', views.getRecipesForLarder),
]
