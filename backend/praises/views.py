from rest_framework import viewsets
from .models import Praise
from .serializers import PraiseSerializer


class PraiseViewSet(viewsets.ModelViewSet):
    queryset = Praise.objects.all()
    serializer_class = PraiseSerializer
    http_method_names = ['get', 'post', 'head', 'options']
