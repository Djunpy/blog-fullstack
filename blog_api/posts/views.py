from django.core.exceptions import EmptyResultSet
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from .models import Post, Comment, Category, Tag
from .serializers import (
    PostReadSerializer, PostWriteSerializer,
    CommentSerializer, CategorySerializer,
    TagSerializer, AuthorPostSerializer
)
from .paginations import PostListPagination


class TagAPIView(GenericAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def get(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)


class CommentAPIView(GenericAPIView):

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            response = {'msg': 'Comment has been successfully created'}
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryAPIView(GenericAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def get(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LastPostAPIView(GenericAPIView):
    serializer_class = PostReadSerializer
    lookup_field = 'id'

    def get(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = Post.objects\
            .select_related('category', 'author')\
            .prefetch_related('tags', 'comment_set', 'bookmarks')\
            .filter(status='published').order_by('-published')[:5]
        return queryset


class GetAuthorPost(GenericAPIView):
    serializer_class = AuthorPostSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            serializer = self.get_serializer(self.get_queryset(), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyResultSet:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        queryset = Post.objects.filter(author=self.request.user).only('id', 'title', 'image')
        return queryset


class PostAPIView(ModelViewSet):

    serializer_class = PostReadSerializer
    lookup_field = 'id'
    pagination_class = PostListPagination

    def get_queryset(self):
        queryset = Post.objects\
            .select_related('category', 'author')\
            .prefetch_related('tags', 'comment_set', 'bookmarks')\
            .filter(status='published')
        title = self.request.query_params.get('q')
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'destroy'):
            return PostWriteSerializer
        return PostReadSerializer






