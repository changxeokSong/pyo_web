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
        from django.http import HttpResponse

        # Create the HttpResponse object with the appropriate CSV header.
        response = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': 'attachment; filename="inquiries.csv"'},
        )
        
        # BOM (Byte Order Mark) for Korean Excel compatibility
        response.write(u'\ufeff'.encode('utf8'))

        writer = csv.writer(response)
        writer.writerow(['문의 유형', '회사명', '성함', '연락처', '이메일', '문의 내용', '접수일시'])

        for obj in queryset:
            writer.writerow([
                obj.get_category_display(),
                obj.company,
                obj.name,
                obj.phone,
                obj.email,
                obj.message,
                obj.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            ])

        return response
    export_to_csv.short_description = "선택된 문의사항을 엑셀(CSV)로 내보내기"
