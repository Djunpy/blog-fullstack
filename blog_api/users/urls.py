from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    UserLoginAPIView, UserRegisterAPIView,
    ProfileAPIView, UserBookmarkAPIView,
    UserListAPIView
)


app_name = 'users'

urlpatterns = [
    path('bookmark/<int:post_id>/', UserBookmarkAPIView.as_view(), name='bookmark'),
    path('user-list/', UserListAPIView.as_view(), name='user-list'),
    path('profile/', ProfileAPIView.as_view(), name='profile'),
    path('register/', UserRegisterAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]