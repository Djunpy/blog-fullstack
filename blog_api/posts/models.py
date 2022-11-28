from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

from posts.utils import file_directory_path

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=80)

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'

    def __str__(self):
        return self.name


class Post(models.Model):

    OPTIONS = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )
    SELECT_TYPE = (
        ('new', 'New'),
        ('article', 'Article')
    )
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to=file_directory_path, blank=True, null=True)
    content = models.TextField()
    bookmarks = models.ManyToManyField(User, related_name='bookmarks', blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    status = models.CharField(max_length=10, choices=OPTIONS, default='published')
    published = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = 'Публикация'
        verbose_name_plural = 'Публикации'

    def get_total_comments(self):
        return self.comment_set.all().count()

    def get_total_bookmarks(self):
        return self.bookmarks.all().count()

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return self.author.username
