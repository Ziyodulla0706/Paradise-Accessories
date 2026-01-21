"""
Helper utility functions for IP extraction, user agent parsing, etc.
"""


def get_client_ip(request):
    """
    Extract client IP address from request.
    
    Args:
        request: Django request object
    
    Returns:
        str: IP address or None
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_user_agent(request):
    """
    Extract user agent from request.
    
    Args:
        request: Django request object
    
    Returns:
        str: User agent string
    """
    return request.META.get('HTTP_USER_AGENT', '')


def get_session_id(request):
    """
    Get or create a session ID for analytics tracking.
    
    Args:
        request: Django request object
    
    Returns:
        str: Session ID
    """
    if not request.session.session_key:
        request.session.create()
    return request.session.session_key
