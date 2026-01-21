from django.contrib import admin
from .models import AnalyticsEvent


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    """
    Admin for AnalyticsEvent model.
    """
    list_display = (
        'id', 'timestamp', 'event_type', 'page', 'language', 'session_id'
    )
    
    list_filter = (
        'event_type', 'language', 'timestamp'
    )
    
    search_fields = (
        'page', 'session_id', 'ip_address'
    )
    
    readonly_fields = (
        'event_type', 'page', 'language', 'referrer',
        'ip_address', 'user_agent', 'session_id', 'metadata', 'timestamp'
    )
    
    date_hierarchy = 'timestamp'
    ordering = ('-timestamp',)
    list_per_page = 100
    
    def has_add_permission(self, request):
        """Disable manual adding of events."""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Make events read-only."""
        return False
