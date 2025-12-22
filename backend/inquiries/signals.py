from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Inquiry

@receiver(post_save, sender=Inquiry)
def send_inquiry_notification(sender, instance, created, **kwargs):
    if created:
        subject = f'[문의 알림] {instance.company} ({instance.name}님)로부터 새로운 솔루션 문의가 도착했습니다.'
        message = f"""
        [새로운 문의 상세 내용]
        
        ■ 문의 유형: {instance.get_category_display()}
        ■ 회사명: {instance.company}
        ■ 담당자: {instance.name}
        ■ 연락처: {instance.phone}
        ■ 이메일: {instance.email}
        
        ■ 문의 내용:
        {instance.message}
        
        ------
        ※ 관리자 페이지에서 엑셀 다운로드 및 상세 확인이 가능합니다.
        """
        
        recipient_list = [settings.ADMIN_EMAIL]
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                recipient_list,
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email notification: {e}")
