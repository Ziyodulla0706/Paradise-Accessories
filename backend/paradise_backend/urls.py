"""
URL configuration for paradise_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Health check endpoint
    path('api/health/', include('core.urls')),
    
    # API endpoints
    path('api/leads/', include('leads.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/content/', include('content.urls')),
    
    # DRF auth (for browsable API)
    path('api-auth/', include('rest_framework.urls')),
]

# Serve media and static files in development
if settings.DEBUG:
    from django.views.static import serve
    from django.views.generic import RedirectView
    import os
    
    # Serve media files
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    # Serve assets directory
    urlpatterns += [
        path('assets/<path:path>', serve, {
            'document_root': settings.BASE_DIR.parent / 'assets',
        }),
    ]
    
    # Serve frontend HTML files
    def serve_html(request, language='ru', page='index'):
        """Serve HTML files from parent directory."""
        file_path = os.path.join(settings.BASE_DIR.parent, language, f'{page}.html')
        return serve(request, os.path.basename(file_path), document_root=os.path.dirname(file_path))
    
    urlpatterns += [
        path('', RedirectView.as_view(url='/ru/index.html', permanent=False)),
        path('<str:language>/<str:page>.html', serve_html),
    ]

# Customize admin site
admin.site.site_header = 'Paradise Accessories'
admin.site.site_title = 'Paradise Accessories Admin'
admin.site.index_title = 'Панель управления'
