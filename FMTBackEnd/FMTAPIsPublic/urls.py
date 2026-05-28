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
from . import fooditemViews, larderViews
from userNoUsername import views as userViews

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('usrs/signin/', userViews.userSignIn),
    path('usrs/signout/', userViews.userSignOut),  
    path('usrs/signup/', userViews.userSignUp),  
    
    path('larder/', larderViews.getOwnLarder),
    path('larders/url-extension/<int:url_exten>/', larderViews.getLarderByURLext),
    path('larders/url-extension/', larderViews.getRandomLarder),
    
    path(r'fooditems/', fooditemViews.postFooditem),
    path(r'fooditems/delete/<int:deleted_fooditem>', fooditemViews.deleteFooditem),

    #path('recipies/<int:fooditem_id>', views.getRecipiesUsingFooditem),
]
