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

        # HTML Email Content (Inline CSS for compatibility)
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-top: 4px solid #0d47a1; border-radius: 4px;">
                
                <!-- Header -->
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #eee;">
                    <h1 style="margin: 0; color: #0d47a1; font-size: 24px;">YM Information Tech</h1>
                    <p style="margin: 5px 0 0; color: #666; font-size: 14px;">새로운 홈페이지 문의가 접수되었습니다.</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 30px;">
                    
                    <!-- Info Box -->
                    <div style="background-color: #f5f7fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #e0e0e0;">
                        <div style="margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">
                            <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">문의유형</span> 
                            {instance.get_category_display()}
                        </div>
                        <div style="margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">
                            <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">회사명</span> 
                            {instance.company}
                        </div>
                        <div style="margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">
                            <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">담당자</span> 
                            {instance.name}
                        </div>
                        <div style="margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">
                            <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">연락처</span> 
                            {instance.phone}
                        </div>
                        <div style="margin-bottom: 0;">
                            <span style="font-weight: bold; color: #555; display: inline-block; width: 80px;">이메일</span> 
                            <a href="mailto:{instance.email}" style="color: #1976d2; text-decoration: none;">{instance.email}</a>
                        </div>
                    </div>
                    
                    <!-- Message -->
                    <p style="font-weight: bold; margin-bottom: 10px; font-size: 16px;">문의 내용:</p>
                    <div style="padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 4px; border-left: 4px solid #1976d2; margin-bottom: 30px;">
                        {instance.message.replace(chr(10), '<br>')}
                    </div>

                    <!-- Button -->
                    <div style="text-align: center;">
                        <a href="http://ymtech.kr/admin/inquiries/inquiry/" style="display: inline-block; padding: 12px 24px; background-color: #0d47a1; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">관리자 페이지에서 확인하기</a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; font-size: 12px; color: #888; padding: 20px; background-color: #f8f9fa; border-top: 1px solid #eee;">
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
