from rest_framework import routers
from core.user.viewsets import *
from core.auth.viewsets.register import RegisterViewSet
from core.auth.viewsets.login import LoginViewSet
from core.auth.viewsets.refresh import RefreshViewSet
from core.post.viewsets import PostViewSet

router=routers.SimpleRouter()
router.register(r'user',UserViewSet,basename='user')
router.register(r'auth/register',RegisterViewSet,basename='registration')
router.register(r'auth/login',LoginViewSet,basename='login')
router.register(r'auth/refresh',RefreshViewSet,basename='refresh')
router.register(r'post',PostViewSet,basename='post')
urlpatterns=[
    *router.urls,
]