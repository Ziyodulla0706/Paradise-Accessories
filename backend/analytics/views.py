"""
Views and API endpoints for the Analytics app.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta
from collections import defaultdict

from .models import AnalyticsEvent
from .serializers import (
    AnalyticsEventSerializer,
    AnalyticsEventCreateSerializer,
    DashboardStatsSerializer
)
from core.utils.helpers import get_client_ip, get_user_agent


@api_view(['POST'])
@permission_classes([AllowAny])
def track_event(request):
    """
    Public endpoint for tracking analytics events from frontend.
    
    POST data:
        - event_type: str (required) - Type of event
        - page: str (required) - Page URL or path
        - language: str (required) - Language code
        - referrer: str (optional) - Referrer URL
        - session_id: str (required) - Session identifier
        - metadata: dict (optional) - Additional event data
    
    Returns:
        201: Event tracked successfully
        400: Validation error
    """
    serializer = AnalyticsEventCreateSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save event with IP and user agent
        event = serializer.save(
            ip_address=get_client_ip(request),
            user_agent=get_user_agent(request),
        )
        
        return Response(
            {'success': True, 'event_id': event.id},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        {'success': False, 'errors': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    """
    Get analytics statistics for the dashboard.
    
    Returns comprehensive analytics data including:
        - Total page views
        - Unique sessions
        - Form submissions
        - Page views this week
        - Top pages
        - Events breakdown by type and language
        - Daily statistics
    """
    # Calculate date ranges
    now = timezone.now()
    week_ago = now - timedelta(days=7)
    month_ago = now - timedelta(days=30)
    
    # Total metrics
    total_page_views = AnalyticsEvent.objects.filter(event_type='page_view').count()
    unique_sessions = AnalyticsEvent.objects.values('session_id').distinct().count()
    form_submissions = AnalyticsEvent.objects.filter(event_type='form_submit').count()
    page_views_this_week = AnalyticsEvent.objects.filter(
        event_type='page_view',
        timestamp__gte=week_ago
    ).count()
    
    # Top pages
    top_pages_data = (
        AnalyticsEvent.objects
        .filter(event_type='page_view')
        .values('page')
        .annotate(count=Count('id'))
        .order_by('-count')[:10]
    )
    top_pages = [
        {'page': item['page'], 'views': item['count']}
        for item in top_pages_data
    ]
    
    # Events by type
    events_by_type = dict(
        AnalyticsEvent.objects
        .values('event_type')
        .annotate(count=Count('id'))
        .values_list('event_type', 'count')
    )
    
    # Events by language
    events_by_language = dict(
        AnalyticsEvent.objects
        .values('language')
        .annotate(count=Count('id'))
        .values_list('language', 'count')
    )
    
    # Daily stats for the last 30 days
    daily_stats = []
    for i in range(30):
        date = (now - timedelta(days=i)).date()
        next_date = date + timedelta(days=1)
        
        day_views = AnalyticsEvent.objects.filter(
            event_type='page_view',
            timestamp__date=date
        ).count()
        
        day_submissions = AnalyticsEvent.objects.filter(
            event_type='form_submit',
            timestamp__date=date
        ).count()
        
        daily_stats.insert(0, {
            'date': date.isoformat(),
            'page_views': day_views,
            'form_submissions': day_submissions,
        })
    
    stats_data = {
        'total_page_views': total_page_views,
        'unique_sessions': unique_sessions,
        'form_submissions': form_submissions,
        'page_views_this_week': page_views_this_week,
        'top_pages': top_pages,
        'events_by_type': events_by_type,
        'events_by_language': events_by_language,
        'daily_stats': daily_stats,
    }
    
    serializer = DashboardStatsSerializer(stats_data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analytics_report(request):
    """
    Get detailed analytics report with filtering options.
    
    Query parameters:
        - start_date: Filter from date (ISO format)
        - end_date: Filter to date (ISO format)
        - event_type: Filter by event type
        - language: Filter by language
        - page: Filter by specific page
    
    Returns filtered analytics events and aggregated statistics.
    """
    # Get query parameters
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    event_type = request.GET.get('event_type')
    language = request.GET.get('language')
    page = request.GET.get('page')
    
    # Build queryset
    queryset = AnalyticsEvent.objects.all()
    
    if start_date:
        queryset = queryset.filter(timestamp__gte=start_date)
    if end_date:
        queryset = queryset.filter(timestamp__lte=end_date)
    if event_type:
        queryset = queryset.filter(event_type=event_type)
    if language:
        queryset = queryset.filter(language=language)
    if page:
        queryset = queryset.filter(page__icontains=page)
    
    # Get aggregated data
    total_events = queryset.count()
    unique_sessions = queryset.values('session_id').distinct().count()
    
    by_type = dict(
        queryset.values('event_type')
        .annotate(count=Count('id'))
        .values_list('event_type', 'count')
    )
    
    by_language = dict(
        queryset.values('language')
        .annotate(count=Count('id'))
        .values_list('language', 'count')
    )
    
    # Get recent events (limit to 100)
    recent_events = queryset.order_by('-timestamp')[:100]
    events_serializer = AnalyticsEventSerializer(recent_events, many=True)
    
    return Response({
        'summary': {
            'total_events': total_events,
            'unique_sessions': unique_sessions,
            'by_type': by_type,
            'by_language': by_language,
        },
        'events': events_serializer.data,
    })
