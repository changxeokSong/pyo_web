from django.contrib import admin
from .models import Praise


@admin.register(Praise)
class PraiseAdmin(admin.ModelAdmin):
    list_display = ('message', 'created_at')
    search_fields = ('message',)
    ordering = ('-created_at',)
