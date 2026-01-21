"""
Custom exception handlers for Django REST Framework.
"""
from rest_framework.views import exception_handler
from rest_framework import status
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that provides consistent error responses.
    
    Args:
        exc: The exception that was raised
        context: Dictionary containing any additional context
    
    Returns:
        Response: Formatted error response
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    # Log the exception
    logger.error(
        f"Exception occurred: {type(exc).__name__}",
        exc_info=True,
        extra={'context': context}
    )
    
    # Customize the response
    if response is not None:
        custom_response_data = {
            'success': False,
            'error': {
                'code': response.status_code,
                'message': 'An error occurred',
                'details': {}
            }
        }
        
        # Handle validation errors
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            custom_response_data['error']['message'] = 'Validation error'
            if hasattr(response.data, 'detail'):
                custom_response_data['error']['details'] = response.data
            else:
                custom_response_data['error']['details'] = response.data
        
        # Handle authentication errors
        elif response.status_code == status.HTTP_401_UNAUTHORIZED:
            custom_response_data['error']['message'] = 'Authentication required'
            custom_response_data['error']['details'] = {
                'detail': 'Invalid or missing authentication credentials'
            }
        
        # Handle permission errors
        elif response.status_code == status.HTTP_403_FORBIDDEN:
            custom_response_data['error']['message'] = 'Permission denied'
            custom_response_data['error']['details'] = {
                'detail': 'You do not have permission to perform this action'
            }
        
        # Handle not found errors
        elif response.status_code == status.HTTP_404_NOT_FOUND:
            custom_response_data['error']['message'] = 'Resource not found'
            custom_response_data['error']['details'] = {
                'detail': 'The requested resource was not found'
            }
        
        # Handle rate limit errors
        elif response.status_code == status.HTTP_429_TOO_MANY_REQUESTS:
            custom_response_data['error']['message'] = 'Rate limit exceeded'
            custom_response_data['error']['details'] = {
                'detail': 'Too many requests. Please try again later.'
            }
        
        # Handle server errors
        elif response.status_code >= 500:
            custom_response_data['error']['message'] = 'Internal server error'
            custom_response_data['error']['details'] = {
                'detail': 'An unexpected error occurred. Please try again later.'
            }
        
        response.data = custom_response_data
    
    return response
