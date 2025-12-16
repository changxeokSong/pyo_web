from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    achieved_at = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    video = models.FileField(upload_to='post_videos/', blank=True, null=True)
    is_blocked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
