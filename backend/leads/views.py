"""
Views and API endpoints for the Leads app.
"""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_ratelimit.decorators import ratelimit
from django.http import HttpResponse
from django.db.models import Count, Q
from django.utils import timezone
from django.db import transaction
from datetime import timedelta
import csv
import logging

logger = logging.getLogger('leads')

from .models import Lead
from .serializers import (
    LeadSerializer,
    LeadCreateSerializer,
    LeadListSerializer,
    LeadStatsSerializer
)
from core.utils.helpers import get_client_ip, get_user_agent
from core.utils.email import send_lead_notification, send_auto_reply
from core.utils.telegram import send_telegram_notification


class LeadViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing leads (protected, requires authentication).
    
    Provides CRUD operations for leads with filtering, searching, and ordering.
    """
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'product_type', 'language', 'created_at']
    search_fields = ['name', 'company', 'phone', 'email', 'message']
    ordering_fields = ['created_at', 'updated_at', 'status', 'name', 'company']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Optimize queryset with select_related for better performance."""
        return Lead.objects.all().select_related().order_by('-created_at')
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'list':
            return LeadListSerializer
        return LeadSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get statistical overview of leads.
        
        Returns:
            - Total leads count
            - Leads by status
            - Leads this week/month
            - Breakdown by product type and language
            - Recent leads
        """
        # Calculate date ranges
        now = timezone.now()
        week_ago = now - timedelta(days=7)
        month_ago = now - timedelta(days=30)
        
        # Count leads by status
        total_leads = Lead.objects.count()
        new_leads = Lead.objects.filter(status='new').count()
        contacted_leads = Lead.objects.filter(status='contacted').count()
        qualified_leads = Lead.objects.filter(status='qualified').count()
        closed_leads = Lead.objects.filter(status='closed').count()
        
        # Time-based counts
        leads_this_week = Lead.objects.filter(created_at__gte=week_ago).count()
        leads_this_month = Lead.objects.filter(created_at__gte=month_ago).count()
        
        # Breakdown by product type
        by_product_type = dict(
            Lead.objects.values('product_type')
            .annotate(count=Count('id'))
            .values_list('product_type', 'count')
        )
        
        # Breakdown by language
        by_language = dict(
            Lead.objects.values('language')
            .annotate(count=Count('id'))
            .values_list('language', 'count')
        )
        
        # Recent leads
        recent_leads = Lead.objects.all()[:5]
        
        stats_data = {
            'total_leads': total_leads,
            'new_leads': new_leads,
            'contacted_leads': contacted_leads,
            'qualified_leads': qualified_leads,
            'closed_leads': closed_leads,
            'leads_this_week': leads_this_week,
            'leads_this_month': leads_this_month,
            'by_product_type': by_product_type,
            'by_language': by_language,
            'recent_leads': recent_leads,
        }
        
        serializer = LeadStatsSerializer(stats_data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def export_csv(self, request):
        """
        Export leads to CSV file.
        
        Query parameters:
            - status: Filter by status
            - start_date: Filter from date
            - end_date: Filter to date
        """
        # Get query parameters for filtering
        queryset = self.filter_queryset(self.get_queryset())
        
        # Create CSV response
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="leads_export.csv"'
        response.write('\ufeff')  # UTF-8 BOM for Excel
        
        writer = csv.writer(response)
        
        # Write header
        writer.writerow([
            'ID', 'Дата', 'Имя', 'Компания', 'Телефон', 'Email',
            'Тип продукта', 'Количество', 'Сообщение', 'Статус',
            'Язык', 'Источник'
        ])
        
        # Write data
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
                lead.language,
                lead.source or '',
            ])
        
        return response


@api_view(['POST'])
@permission_classes([AllowAny])
@ratelimit(key='ip', rate='5/h', method='POST')
def contact_submit(request):
    """
    Public endpoint for submitting contact form.
    
    Rate limited to 5 submissions per hour per IP.
    
    POST data:
        - name: str (required)
        - company: str (required)
        - phone: str (required)
        - email: str (optional)
        - product_type: str (required)
        - quantity: int (optional)
        - message: str (optional)
        - file: file (optional)
        - language: str (default: 'ru')
        - source: str (optional)
    
    Returns:
        201: Lead created successfully
        400: Validation error
        429: Rate limit exceeded
        500: Server error
    """
    # Check if rate limited
    was_limited = getattr(request, 'limited', False)
    if was_limited:
        logger.warning(f"Rate limit exceeded for IP: {get_client_ip(request)}")
        return Response(
            {
                'success': False,
                'error': {
                    'code': 429,
                    'message': 'Слишком много запросов. Попробуйте позже.',
                    'details': {}
                }
            },
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )
    
    try:
        # Create serializer with request data
        serializer = LeadCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save lead with additional metadata using atomic transaction
            with transaction.atomic():
                lead = serializer.save(
                    ip_address=get_client_ip(request),
                    user_agent=get_user_agent(request),
                )
            
            # Send notifications asynchronously (you can use Celery in production)
            # Don't fail the request if notifications fail
            try:
                send_lead_notification(lead)
            except Exception as e:
                logger.error(f"Failed to send email notification for lead {lead.id}: {str(e)}")
            
            try:
                send_auto_reply(lead)
            except Exception as e:
                logger.error(f"Failed to send auto-reply for lead {lead.id}: {str(e)}")
            
            try:
                send_telegram_notification(lead)
            except Exception as e:
                logger.error(f"Failed to send Telegram notification for lead {lead.id}: {str(e)}")
            
            logger.info(f"New lead created: {lead.id} from {lead.company}")
            
            return Response(
                {
                    'success': True,
                    'message': 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
                    'lead_id': lead.id
                },
                status=status.HTTP_201_CREATED
            )
        
        # Validation errors
        logger.warning(f"Validation error in contact form: {serializer.errors}")
        return Response(
            {
                'success': False,
                'error': {
                    'code': 400,
                    'message': 'Ошибка валидации данных',
                    'details': serializer.errors
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    except Exception as e:
        # Unexpected server error
        logger.error(f"Unexpected error in contact_submit: {str(e)}", exc_info=True)
        return Response(
            {
                'success': False,
                'error': {
                    'code': 500,
                    'message': 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.',
                    'details': {}
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
