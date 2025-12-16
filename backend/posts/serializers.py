from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'location', 'achieved_at', 'content', 'image', 'video', 'is_blocked', 'created_at']
