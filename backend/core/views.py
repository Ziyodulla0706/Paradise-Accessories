"""
Core views for Paradise Accessories backend.
Includes health check endpoint and error handlers.
"""
from django.http import JsonResponse
from django.db import connection
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check endpoint for monitoring and load balancers.
    
    Returns:
        - 200 OK: All systems operational
        - 503 Service Unavailable: Database or critical service unavailable
    """
    if not settings.ENABLE_HEALTH_CHECK:
        return Response(
            {'error': 'Health check disabled'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    
    health_status = {
        'status': 'healthy',
        'service': 'Paradise Accessories API',
        'version': '1.0.0',
        'checks': {}
    }
    
    overall_healthy = True
    
    # Database check
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        health_status['checks']['database'] = {
            'status': 'healthy',
            'message': 'Database connection successful'
        }
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        health_status['checks']['database'] = {
            'status': 'unhealthy',
            'message': f'Database connection failed: {str(e)}'
        }
        overall_healthy = False
    
    # Settings check
    try:
        health_status['checks']['settings'] = {
            'status': 'healthy',
            'debug': settings.DEBUG,
            'allowed_hosts_configured': bool(settings.ALLOWED_HOSTS),
        }
    except Exception as e:
        logger.error(f"Settings health check failed: {str(e)}")
        health_status['checks']['settings'] = {
            'status': 'unhealthy',
            'message': f'Settings check failed: {str(e)}'
        }
        overall_healthy = False
    
    # Update overall status
    if not overall_healthy:
        health_status['status'] = 'unhealthy'
        return Response(health_status, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    
    return Response(health_status, status=status.HTTP_200_OK)


def custom_404_handler(request, exception):
    """
    Custom 404 handler for API endpoints.
    """
    return JsonResponse(
        {
            'error': 'Not Found',
            'message': 'The requested resource was not found.',
            'path': request.path
        },
        status=404
    )


def custom_500_handler(request):
    """
    Custom 500 handler for server errors.
    """
    logger.error(f"Internal server error on {request.path}")
    return JsonResponse(
        {
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred. Please try again later.',
        },
        status=500
    )
