from django.urls import path

from .views import (
    PostAPIView, CommentAPIView,
    CategoryAPIView, LastPostAPIView,
    TagAPIView, GetAuthorPost
)

app_name = 'posts'

urlpatterns = [
    path('author-posts/', GetAuthorPost.as_view(), name='author-posts'),
    path('tags/', TagAPIView.as_view(), name='tags'),
    path('comment/', CommentAPIView.as_view(), name='comment'),
    path('category/', CategoryAPIView.as_view(), name='category'),
    path('last-post/', LastPostAPIView.as_view(), name='last-post'),
    path('', PostAPIView.as_view({
        'get': 'list',
        'post': 'create'
    }), name='collections-post'),
    path('<int:id>/', PostAPIView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    }), name='single-post'),
]