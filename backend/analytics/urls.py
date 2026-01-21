"""
URL configuration for analytics app.
"""
from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    path('track/', views.track_event, name='track-event'),
    path('dashboard/', views.dashboard_stats, name='dashboard-stats'),
    path('report/', views.analytics_report, name='analytics-report'),
]
