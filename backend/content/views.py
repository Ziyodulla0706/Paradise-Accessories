"""
Views and API endpoints for the Content app (Portfolio & Products).
"""
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from .models import PortfolioItem, Product
from .serializers import (
    PortfolioItemSerializer,
    ProductListSerializer,
    ProductDetailSerializer
)


class PortfolioItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для просмотра элементов портфолио.
    Только публичные опубликованные элементы.
    """
    serializer_class = PortfolioItemSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', '-created_at']
    
    def get_queryset(self):
        """Optimize queryset for published items only."""
        return PortfolioItem.objects.filter(is_published=True).order_by('order', '-created_at')
    
    def get_serializer_context(self):
        """Передать язык в serializer."""
        context = super().get_serializer_context()
        # Язык из query параметра ?lang=ru или заголовка
        language = self.request.query_params.get('lang', 'ru')
        context['language'] = language
        return context


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API для просмотра продуктов.
    Список и детали опубликованных продуктов.
    """
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['name_ru', 'name_en', 'name_uz', 'description_ru']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', '-created_at']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Optimize queryset with prefetch_related for images."""
        return Product.objects.filter(
            is_published=True
        ).prefetch_related('images').order_by('order', '-created_at')
    
    def get_serializer_class(self):
        """Использовать разные serializers для списка и детальной страницы."""
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
    
    def get_serializer_context(self):
        """Передать язык в serializer."""
        context = super().get_serializer_context()
        language = self.request.query_params.get('lang', 'ru')
        context['language'] = language
        return context
