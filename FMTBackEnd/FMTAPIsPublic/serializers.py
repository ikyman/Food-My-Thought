from django.contrib.auth.models import Group, User

# Serailizers were the number one item on the django tutorial.
# Took me 15 minutes looking up what a serializer actually does to realize
# it's for facilitating Database-backend communication, and not Frontend-backend.
class FPSSerializer(serializers.HyperlinkedModelSerializer):
 pass 