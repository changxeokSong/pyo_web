from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Inquiry

@receiver(post_save, sender=Inquiry)
def send_inquiry_notification(sender, instance, created, **kwargs):
    if created:
        subject = f'[문의 알림] {instance.company} ({instance.name}님)로부터 새로운 문의가 도착했습니다.'
        
        # Plain text fallback
        text_message = f"""
        [새로운 문의 상세]
        - 유형: {instance.get_category_display()}
        - 회사명: {instance.company}
        - 담당자: {instance.name}
        - 연락처: {instance.phone}
        - 이메일: {instance.email}
        
        내용:
        {instance.message}
        """

        # HTML Email Content
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-top: 4px solid #0d47a1; background-color: #fff; }}
                .header {{ background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #eee; }}
                .header h1 {{ margin: 0; color: #0d47a1; font-size: 24px; }}
                .content {{ padding: 30px; }}
                .info-box {{ background-color: #f5f7fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }}
                .info-row {{ margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px; }}
                .info-label {{ font-weight: bold; color: #555; display: inline-block; width: 80px; }}
                .message-box {{ padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 4px; border-left: 4px solid #1976d2; }}
                .footer {{ text-align: center; font-size: 12px; color: #888; padding: 20px; background-color: #f8f9fa; border-top: 1px solid #eee; }}
                .btn {{ display: inline-block; padding: 10px 20px; background-color: #0d47a1; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>YM Information Tech</h1>
                    <p style="margin: 5px 0 0; color: #666; font-size: 14px;">새로운 홈페이지 문의가 접수되었습니다.</p>
                </div>
                <div class="content">
                    <div class="info-box">
                        <div class="info-row">
                            <span class="info-label">문의유형</span> {instance.get_category_display()}
                        </div>
                        <div class="info-row">
                            <span class="info-label">회사명</span> {instance.company}
                        </div>
                        <div class="info-row">
                            <span class="info-label">담당자</span> {instance.name}
                        </div>
                        <div class="info-row">
                            <span class="info-label">연락처</span> {instance.phone}
                        </div>
                        <div class="info-row" style="border-bottom: none;">
                            <span class="info-label">이메일</span> <a href="mailto:{instance.email}">{instance.email}</a>
                        </div>
                    </div>
                    
                    <p style="font-weight: bold; margin-bottom: 10px;">문의 내용:</p>
                    <div class="message-box">
                        {instance.message.replace(chr(10), '<br>')}
                    </div>

                    <div style="text-align: center;">
                        <a href="http://ymtech.kr/admin/inquiries/inquiry/" class="btn" style="color: #fff;">관리자 페이지에서 확인하기</a>
                    </div>
                </div>
                <div class="footer">
                    본 메일은 (주)와이엠정보통신 홈페이지에서 발송된 알림 메일입니다.<br>
                    &copy; 2025 YM Information Technology. All rights reserved.
                </div>
            </div>
        </body>
        </html>
        """
        
        recipient_list = [settings.ADMIN_EMAIL]
        
        try:
            send_mail(
                subject=subject,
                message=text_message, # Fallback for plain text clients
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                html_message=html_message, # Main HTML content
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email notification: {e}")
