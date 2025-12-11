from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  list_display = ('title', 'location', 'achieved_at', 'created_at')
  search_fields = ('title', 'location', 'content')
  list_filter = ('created_at',)
