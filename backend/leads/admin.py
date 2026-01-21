from django.contrib import admin
from django.utils.html import format_html
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    """
    Custom admin for Lead model with enhanced features.
    """
    list_display = (
        'id', 'created_at', 'name', 'company', 'phone',
        'product_type_badge', 'status_badge', 'language', 'has_file'
    )
    
    list_filter = (
        'status', 'product_type', 'language', 'created_at'
    )
    
    search_fields = (
        'name', 'company', 'phone', 'email', 'message'
    )
    
    readonly_fields = (
        'created_at', 'updated_at', 'ip_address', 'user_agent'
    )
    
    fieldsets = (
        ('Контактная информация', {
            'fields': ('name', 'company', 'phone', 'email')
        }),
        ('Детали заявки', {
            'fields': ('product_type', 'quantity', 'message', 'file')
        }),
        ('Управление', {
            'fields': ('status',)
        }),
        ('Метаданные', {
            'fields': ('language', 'source', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    list_per_page = 50
    
    actions = ['mark_as_contacted', 'mark_as_qualified', 'mark_as_closed', 'export_to_csv']
    
    def product_type_badge(self, obj):
        """Display product type as colored badge."""
        colors = {
            'woven': '#4CAF50',
            'printed': '#2196F3',
            'hang_tags': '#FF9800',
            'stickers': '#9C27B0',
            'other': '#607D8B',
        }
        color = colors.get(obj.product_type, '#999')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.get_product_type_display()
        )
    product_type_badge.short_description = 'Продукт'
    
    def status_badge(self, obj):
        """Display status as colored badge."""
        colors = {
            'new': '#F44336',
            'contacted': '#FF9800',
            'qualified': '#2196F3',
            'closed': '#4CAF50',
            'rejected': '#9E9E9E',
        }
        color = colors.get(obj.status, '#999')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Статус'
    
    def has_file(self, obj):
        """Show if lead has an attached file."""
        if obj.file:
            return format_html('<span style="color: green;">✓</span>')
        return format_html('<span style="color: #ccc;">✗</span>')
    has_file.short_description = 'Файл'
    
    # Custom actions
    def mark_as_contacted(self, request, queryset):
        """Mark selected leads as contacted."""
        updated = queryset.update(status='contacted')
        self.message_user(request, f'{updated} заявок отмечено как "Связались"')
    mark_as_contacted.short_description = 'Отметить как "Связались"'
    
    def mark_as_qualified(self, request, queryset):
        """Mark selected leads as qualified."""
        updated = queryset.update(status='qualified')
        self.message_user(request, f'{updated} заявок отмечено как "Квалифицирован"')
    mark_as_qualified.short_description = 'Отметить как "Квалифицирован"'
    
    def mark_as_closed(self, request, queryset):
        """Mark selected leads as closed."""
        updated = queryset.update(status='closed')
        self.message_user(request, f'{updated} заявок отмечено как "Закрыт"')
    mark_as_closed.short_description = 'Отметить как "Закрыт"'
    
    def export_to_csv(self, request, queryset):
        """Export selected leads to CSV."""
        import csv
        from django.http import HttpResponse
        
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="leads.csv"'
        response.write('\ufeff')  # UTF-8 BOM
        
        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Дата', 'Имя', 'Компания', 'Телефон', 'Email',
            'Продукт', 'Количество', 'Сообщение', 'Статус'
        ])
        
        for lead in queryset:
            writer.writerow([
                lead.id,
                lead.created_at.strftime('%d.%m.%Y %H:%M'),
                lead.name,
                lead.company,
                lead.phone,
                lead.email or '',
                lead.get_product_type_display(),
                lead.quantity or '',
                lead.message,
                lead.get_status_display(),
            ])
        
        return response
    export_to_csv.short_description = 'Экспортировать в CSV'
