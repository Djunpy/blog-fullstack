from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Post, Category, Tag, Comment


@admin.register(Post)
class PostAdminPanel(admin.ModelAdmin):
    list_display = ('title', 'get_image', 'category', 'status', 'published')
    list_filter = ('category', 'status', 'published', 'author')
    search_fields = ('title',)
    list_editable = ('status',)

    def get_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src={obj.image.url} width="100" height="110"')


@admin.register(Comment)
class CommentAdminPanel(admin.ModelAdmin):
    list_display = ('post', 'body', 'author')
    list_filter = ('post', 'author')


admin.site.register(Tag)
admin.site.register(Category)