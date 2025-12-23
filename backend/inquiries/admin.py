from django.contrib import admin
from .models import Inquiry

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'category', 'phone', 'email', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'company', 'phone', 'email', 'message')
    readonly_fields = ('created_at',)
    actions = ['export_to_csv']

    def export_to_csv(self, request, queryset):
        import csv
        import re
        from django.http import HttpResponse

        def format_phone(phone):
            if not phone:
                return ""
            # 숫자만 추출
            clean_phone = re.sub(r'\D', '', str(phone))
            
            # 이미 010-XXXX-XXXX 형식이거나 비슷하게 포맷팅 되어있는 경우
            # 하지만 엑셀에서 0이 잘리는 문제를 방지하기 위해 다시 포맷팅 시도
            
            # 엑셀/DB 저장 시 숫자형으로 되어 앞의 0이 없어진 경우 (예: 10xxxxxxx -> 010xxxxxxx)
            if len(clean_phone) == 10 and clean_phone.startswith('1'):
                clean_phone = '0' + clean_phone
            
            if len(clean_phone) == 11:
                return f"{clean_phone[:3]}-{clean_phone[3:7]}-{clean_phone[7:]}"
            elif len(clean_phone) == 10:
                # 02-xxxx-xxxx (서울) or 011-xxx-xxxx
                if clean_phone.startswith('02'):
                    return f"{clean_phone[:2]}-{clean_phone[2:6]}-{clean_phone[6:]}"
                else:
                    return f"{clean_phone[:3]}-{clean_phone[3:6]}-{clean_phone[6:]}"
            elif len(clean_phone) == 9:
                 # 02-xxx-xxxx
                if clean_phone.startswith('02'):
                    return f"{clean_phone[:2]}-{clean_phone[2:5]}-{clean_phone[5:]}"
            
            # 매칭되지 않으면 원본 반환하되, 엑셀에서 숫자로 인식해서 앞의 0을 자르지 않도록 처리할 수 있음.
            # 하지만 사용자는 "형식 맞춰서 나오게끔"을 원했으므로 가능한 포맷팅을 하고,
            # 포맷팅이 안되는 경우(해외번호 등)는 원본을 유지.
            return phone

        # Create the HttpResponse object with the appropriate CSV header.
        response = HttpResponse(
            content_type='text/csv; charset=utf-8-sig',
            headers={'Content-Disposition': 'attachment; filename="inquiries.csv"'},
        )
        
        # BOM (Byte Order Mark) is handled by utf-8-sig codec in content_type/encoding usually, 
        # but here we are using write directly. 
        # Actually 'utf-8-sig' in content_type might not be enough if we write bytes directly or use default writer.
        # The original code manually wrote BOM: response.write(u'\ufeff'.encode('utf8'))
        # Let's keep the manual BOM write to be safe as it was working, but we can verify.
        response.write(u'\ufeff'.encode('utf8'))

        writer = csv.writer(response)
        writer.writerow(['문의 유형', '회사명', '성함', '연락처', '이메일', '문의 내용', '접수일시'])

        for obj in queryset:
            writer.writerow([
                obj.get_category_display(),
                obj.company,
                obj.name,
                format_phone(obj.phone),
                obj.email,
                obj.message,
                obj.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            ])

        return response
    export_to_csv.short_description = "선택된 문의사항을 엑셀(CSV)로 내보내기"
