from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from core.abstract.models import AbstractModel,AbstractManager

# Create your models here.

class UserManager(BaseUserManager):

    
    def create_user(self,username,email,password=None,**kwargs):
        if username is None:
            raise TypeError('Username is required')
            
        if email is None:
            raise TypeError('Email is required')
            
        if password is None:
            raise TypeError('Paasword is required')
            
        user=self.model(username=username,email=self.normalize_email(email),**kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self,username,email,password,**kwargs):
        if username is None:
            raise TypeError('Username is required')
            
        if email is None:
            raise TypeError('Email is required')
            
        if password is None:
            raise TypeError('Paasword is required')
    
    
        user=self.create_user(username,email,password,**kwargs)
        user.is_superuser=True
        user.is_staff=True
        user.save(using=self._db)
        
        return user
    
    
class User(AbstractBaseUser,PermissionsMixin,AbstractModel):
    username=models.CharField(unique=True,max_length=50)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email=models.EmailField(unique=True,db_index=True)
    is_active=models.BooleanField(default=True)
    is_superuser=models.BooleanField(default=False)
    bio=models.TextField(blank=True)
    avatar=models.TextField(blank=True)    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']
    
    
    objects=UserManager()
    
    def __str__(self):
        return f'{self.email}'
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
    
    
