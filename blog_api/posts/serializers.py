import json

from django.utils.text import slugify
from rest_framework import serializers

from .models import Category, Post, Tag, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ('post', 'author', 'body')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostReadSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    category = serializers.ReadOnlyField(source='category.name')
    total_comments = serializers.SerializerMethodField()
    total_bookmarks = serializers.SerializerMethodField()
    tags_name = serializers.SerializerMethodField()
    post_slug = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'id', 'title', 'image', 'content',
            'category', 'published', 'status', 'author',
            'total_comments', 'total_bookmarks',
            'tags_name', 'post_slug', 'comments'

        )

    def get_total_comments(self, obj):
        return obj.get_total_comments()

    def get_comments(self, obj):
        comments = []
        for comment in obj.comment_set.all():
            comments.append({
                'id': comment.id,
                'author': comment.author.username,
                'body': comment.body,
            })
        return comments

    def get_total_bookmarks(self, obj):
        return obj.get_total_bookmarks()

    def get_tags_name(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def get_post_slug(self, obj):
        return slugify(obj.title)


class PostWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category = serializers.SlugRelatedField(queryset=Category.objects.all(), slug_field='name')
    tags = serializers.CharField()

    class Meta:
        model = Post
        fields = (
            'title', 'category', 'tags',
            'image', 'content', 'author',
            )

    def create_or_get_tags(self, tags):
        tag_ids = []
        for tag in tags.split(' '):
            instance_tag, created = Tag.objects.get_or_create(
                name=tag
            )
            tag_ids.append(instance_tag.id)
        return tag_ids

    def create(self, validated_data):
        tags = validated_data.pop('tags')
        post = Post.objects.create(**validated_data)
        post.tags.set(self.create_or_get_tags(tags))
        return post

    def update(self, instance, validated_data):
        tags = validated_data.pop('tags')

        instance.title = validated_data.get('title', instance.title)
        instance.image = validated_data.get('image', instance.image)
        instance.category = validated_data.get('category', instance.category)
        instance.content = validated_data.get('content', instance.content)
        instance.tags.set(self.create_or_update_tags(tags))
        instance.save()
        return instance


class AuthorPostSerializer(serializers.ModelSerializer):

    # @classmethod
    # def setup_eager_loading(cls, queryset):
    #     queryset = queryset.only(*cls.Meta.fields)
    #     return queryset

    class Meta:
        model = Post
        fields = ('id', 'title', 'image')