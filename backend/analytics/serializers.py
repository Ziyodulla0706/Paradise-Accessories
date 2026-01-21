from rest_framework import serializers
from .models import AnalyticsEvent


class AnalyticsEventSerializer(serializers.ModelSerializer):
    """
    Serializer for AnalyticsEvent model.
    """
    class Meta:
        model = AnalyticsEvent
        fields = '__all__'
        read_only_fields = ('timestamp',)


class AnalyticsEventCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating analytics events from frontend.
    """
    class Meta:
        model = AnalyticsEvent
        fields = [
            'event_type', 'page', 'language',
            'referrer', 'session_id', 'metadata'
        ]


class DashboardStatsSerializer(serializers.Serializer):
    """
    Serializer for dashboard analytics statistics.
    """
    total_page_views = serializers.IntegerField()
    unique_sessions = serializers.IntegerField()
    form_submissions = serializers.IntegerField()
    page_views_this_week = serializers.IntegerField()
    top_pages = serializers.ListField()
    events_by_type = serializers.DictField()
    events_by_language = serializers.DictField()
    daily_stats = serializers.ListField()
