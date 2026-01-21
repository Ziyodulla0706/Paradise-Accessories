"""
URL configuration for content app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'portfolio', views.PortfolioItemViewSet, basename='portfolio')
router.register(r'products', views.ProductViewSet, basename='product')

app_name = 'content'

urlpatterns = [
    path('', include(router.urls)),
]
