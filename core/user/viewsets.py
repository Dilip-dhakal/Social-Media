from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import viewsets
from core.user.serializers import *
from core.user.models import User

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    http_method_names=('patch','get')
    permission_classes=[IsAuthenticated]
    serializer_class=UserSerializer
    
    def get_queryset(self):#Get queryset retreives all the users
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)
    
    def get_object(self):#Get object only retrieves single user
        obj=User.objects.get_object_by_public_id(self.kwargs['pk'])#When a user visits a URL like /api/user/123-abc/, Django captures 123-abc and stores it in a dictionary called kwargs under the key 'pk' (Primary Key).
        self.check_object_permissions(self.request,obj) 
        
        return obj   