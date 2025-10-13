from django.contrib.auth.forms import UserCreationForm
from .models import UsernamelessUser

class UsernamelessCreationForm(UserCreationForm):
 class Meta(UserCreationForm.Meta):
  model = CustomUser
  fields = ('email', password1, password2)

