from django.db import models

class Inquiry(models.Model):
    CATEGORY_CHOICES = [
        ('quote', '솔루션 견적/도입 문의'),
        ('maintenance', '유지보수/장애 접수'),
        ('partnership', '협력/제안'),
        ('other', '기타 문의'),
    ]

    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='quote')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_category_display()}] {self.name} - {self.company}"
