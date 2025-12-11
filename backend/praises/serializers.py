from rest_framework import serializers
from .models import Praise


class PraiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Praise
        fields = ['id', 'message', 'created_at']
