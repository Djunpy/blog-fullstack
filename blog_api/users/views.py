from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import (
    UserLoginSerializer, UserRegisterSerializer,
    ProfileSerializer, UserSerializer
)
from posts.models import Post


User = get_user_model()


class UserListAPIView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileAPIView(GenericAPIView):

    serializer_class = ProfileSerializer

    def get(self, request):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            'profile': serializer.data
        }
        return Response(response, status.HTTP_200_OK)

    def get_queryset(self):
        queryset = User.objects \
            .prefetch_related('bookmarks') \
            .all()
        return queryset

    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user
        raise NotAuthenticated


class UserBookmarkAPIView(GenericAPIView):

    def post(self, request, post_id=None):
        user = self.get_object()
        post = get_object_or_404(Post, pk=post_id)

        response = {
            'added': 'Post added to favorites',
            'delete': 'Post delete from favorites'
        }

        if user.bookmarks.filter(pk=post_id).exists():
            user.bookmarks.remove(post)
            return Response(response['delete'], status=status.HTTP_204_NO_CONTENT)
        else:
            user.bookmarks.add(post)
            return Response(response['added'], status=status.HTTP_200_OK)

    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user
        raise NotAuthenticated


class UserRegisterAPIView(GenericAPIView):

    serializer_class = UserRegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            response = {
                'msg': 'Register has been successfully',
            }
            return Response(response, status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(GenericAPIView):

    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            token = RefreshToken.for_user(user)
            response = {
                'msg': 'Login has been successfully',
                'user': serializer.data.get('username'),
                'token': {
                    'refresh': str(token),
                    'access': str(token.access_token)
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
