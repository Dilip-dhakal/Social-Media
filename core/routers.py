from rest_framework import routers
from core.user.viewsets import *
from core.auth.viewsets.register import RegisterViewSet
from core.auth.viewsets.login import LoginViewSet
from core.auth.viewsets.refresh import RefreshViewSet
from core.post.viewsets import PostViewSet
from core.comment.viewsets import CommentViewset
from rest_framework_nested import routers

router=routers.SimpleRouter()
router.register(r'user',UserViewSet,basename='user')
router.register(r'auth/register',RegisterViewSet,basename='registration')
router.register(r'auth/login',LoginViewSet,basename='login')
router.register(r'auth/refresh',RefreshViewSet,basename='refresh')
router.register(r'post',PostViewSet,basename='post')
posts_router=routers.NestedSimpleRouter(router,r'post',lookup='post')
posts_router.register(r'comment',CommentViewset,basename='post-comment')
urlpatterns=[
    *router.urls,
    *posts_router.urls,
]