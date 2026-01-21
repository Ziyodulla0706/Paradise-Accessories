"""
URL configuration for leads app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.LeadViewSet, basename='lead')

app_name = 'leads'

urlpatterns = [
    path('submit/', views.contact_submit, name='contact-submit'),
    path('', include(router.urls)),
]
