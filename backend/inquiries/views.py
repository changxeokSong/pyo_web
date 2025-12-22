from rest_framework import viewsets, permissions
from .models import Inquiry
from .serializers import InquirySerializer

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer
    permission_classes = [permissions.AllowAny] # Allow frontend to post without auth for now
