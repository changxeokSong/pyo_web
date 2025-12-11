from rest_framework import viewsets, mixins
from .models import Announcement
from .serializers import AnnouncementSerializer

class AnnouncementViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    Provides a list of announcements ordered by latest first.
    """
    queryset = Announcement.objects.order_by('-created_at')
    serializer_class = AnnouncementSerializer
