from rest_framework import serializers
from .models import PortfolioItem, Product, ProductImage


class PortfolioItemSerializer(serializers.ModelSerializer):
    """
    Serializer для элементов портфолио с поддержкой мультиязычности.
    """
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PortfolioItem
        fields = [
            'id', 'image', 'image_url',
            'title', 'title_ru', 'title_en', 'title_uz',
            'description', 'description_ru', 'description_en', 'description_uz',
            'category', 'category_display',
            'order', 'created_at'
        ]
    
    def get_title(self, obj):
        """Получить название на текущем языке."""
        language = self.context.get('language', 'ru')
        return obj.get_title(language)
    
    def get_description(self, obj):
        """Получить описание на текущем языке."""
        language = self.context.get('language', 'ru')
        return obj.get_description(language)
    
    def get_image_url(self, obj):
        """Получить полный URL изображения."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProductImageSerializer(serializers.ModelSerializer):
    """
    Serializer для изображений продукта.
    """
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'caption', 'order']
    
    def get_image_url(self, obj):
        """Получить полный URL изображения."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProductListSerializer(serializers.ModelSerializer):
    """
    Упрощенный serializer для списка продуктов.
    """
    name = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    main_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'slug', 'main_image', 'main_image_url',
            'name', 'name_ru', 'name_en', 'name_uz',
            'short_description', 'short_description_ru', 'short_description_en', 'short_description_uz',
            'category', 'category_display',
            'is_featured', 'order'
        ]
    
    def get_name(self, obj):
        """Получить название на текущем языке."""
        language = self.context.get('language', 'ru')
        return obj.get_name(language)
    
    def get_short_description(self, obj):
        """Получить краткое описание на текущем языке."""
        language = self.context.get('language', 'ru')
        return obj.get_short_description(language)
    
    def get_main_image_url(self, obj):
        """Получить полный URL основного изображения."""
        if obj.main_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.main_image.url)
            return obj.main_image.url
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Детальный serializer для продукта с галереей.
    """
    name = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    features_list = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    main_image_url = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'slug', 'main_image', 'main_image_url',
            'name', 'name_ru', 'name_en', 'name_uz',
            'short_description', 'short_description_ru', 'short_description_en', 'short_description_uz',
            'description', 'description_ru', 'description_en', 'description_uz',
            'category', 'category_display',
            'features', 'features_list',
            'images', 'is_featured', 'order', 'created_at'
        ]
    
    def get_name(self, obj):
        language = self.context.get('language', 'ru')
        return obj.get_name(language)
    
    def get_short_description(self, obj):
        language = self.context.get('language', 'ru')
        return obj.get_short_description(language)
    
    def get_description(self, obj):
        language = self.context.get('language', 'ru')
        return obj.get_description(language)
    
    def get_features_list(self, obj):
        language = self.context.get('language', 'ru')
        return obj.get_features(language)
    
    def get_main_image_url(self, obj):
        if obj.main_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.main_image.url)
            return obj.main_image.url
        return None
