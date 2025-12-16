from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  list_display = ('title', 'location', 'achieved_at', 'is_blocked', 'created_at')
  list_editable = ('is_blocked',)
  search_fields = ('title', 'location', 'content')
  list_filter = ('is_blocked', 'created_at')
