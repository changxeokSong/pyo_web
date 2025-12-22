from django.db import models

class Inquiry(models.Model):
    CATEGORY_CHOICES = [
        ('solution', '솔루션 도입 문의'),
        ('partnership', '제휴 및 파트너십'),
        ('recruit', '채용 관련'),
        ('other', '기타'),
    ]

    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='solution')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_category_display()}] {self.name} - {self.company}"
