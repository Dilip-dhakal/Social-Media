from rest_framework import serializers
from core.user.models import User
from core.abstract.serializers import AbstractSerializer
from core.post.models import Post

class UserSerializer(AbstractSerializer):
    
    class Meta:
        model=User
        fields=['id','username','first_name','last_name','bio','avatar','email','is_active','created','updated']
        read_only_fields=['is_active','is_superuser','is_staff']
        
        
class PostSerializer(AbstractSerializer):
    liked=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    
    def get_liked(self,instance):
        request=self.context.get('request',None)
        
        if request is None or request.user.is_anonymous:
            return False
        
        return request.user.has_liked(instance)
    
    
    def get_likes_count(self,instance):
        return instance.liked_by.count()
    
    
    class Meta:
        model=Post
        fields=['id','author','body','edited','liked','likes_count','created','updated']
        
        read_only_fields=['edited']
        