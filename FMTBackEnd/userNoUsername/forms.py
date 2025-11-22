from django.forms import ModelForm, CharField, ValidationError, PasswordInput
from .models import UsernamelessUser

class UsernamelessCreationForm(ModelForm):
   """
   A form that creates a user, with no privileges, from the given username and
   password.
   """
   error_messages = {
       'password_mismatch': "The two password fields didn't match.",
   }
   password1 = CharField(label="Password",
       widget=PasswordInput)
   password2 = CharField(label= "Password confirmation",
       widget=PasswordInput,
       help_text="Enter the same password as above, for verification.")

   class Meta():
      model = UsernamelessUser
      fields = ['email']
      

   def clean_password2(self):
      password1 = self.cleaned_data.get("password1")
      password2 = self.cleaned_data.get("password2")
      if password1 and password2 and password1 != password2:
         raise ValidationError(
            self.error_messages['password_mismatch'],
            code='password_mismatch',
         )
      return password2

   def save(self, commit=True):
      user = super(UserCreationForm, self).save(commit=False)
      user.set_password(self.cleaned_data["password1"])
      if commit:
         user.save()
      return user
