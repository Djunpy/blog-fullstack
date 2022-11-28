from django.contrib.auth import get_user_model, authenticate
from django.utils.text import slugify
from rest_framework import serializers


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ProfileSerializer(serializers.ModelSerializer):
    bookmarks = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'username',
            'bookmarks',
        )

    def get_bookmarks(self, obj):
        bookmarks = []
        for post in obj.bookmarks.all():
            bookmarks.append(
                {
                    'id': post.pk,
                     'title': post.title,
                     'image': post.image

                 }
            )
        return bookmarks


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')


