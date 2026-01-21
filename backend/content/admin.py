from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import PortfolioItem, Product, ProductImage


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    """
    Админка для элементов портфолио с превью изображений.
    """
    list_display = (
        'image_preview', 'title_ru', 'category_badge',
        'is_published_badge', 'order', 'created_at'
    )
    
    list_filter = ('category', 'is_published', 'created_at')
    
    search_fields = ('title_ru', 'title_en', 'title_uz', 'description_ru')
    
    list_editable = ('order',)
    
    fieldsets = (
        ('Изображение', {
            'fields': ('image', 'image_preview_large')
        }),
        ('Названия', {
            'fields': ('title_ru', 'title_en', 'title_uz')
        }),
        ('Описания', {
            'fields': ('description_ru', 'description_en', 'description_uz')
        }),
        ('Настройки', {
            'fields': ('category', 'order', 'is_published')
        }),
    )
    
    readonly_fields = ('image_preview_large', 'created_at', 'updated_at')
    
    date_hierarchy = 'created_at'
    ordering = ('order', '-created_at')
    list_per_page = 20
    
    actions = ['publish_items', 'unpublish_items']
    
    def image_preview(self, obj):
        """Маленькое превью в списке."""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return '-'
    image_preview.short_description = 'Превью'
    
    def image_preview_large(self, obj):
        """Большое превью в форме редактирования."""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 400px; max-height: 300px; border-radius: 4px;" />',
                obj.image.url
            )
        return 'Изображение не загружено'
    image_preview_large.short_description = 'Текущее изображение'
    
    def category_badge(self, obj):
        """Цветной бейдж категории."""
        colors = {
            'woven': '#4CAF50',
            'printed': '#2196F3',
            'hang_tags': '#FF9800',
            'stickers': '#9C27B0',
            'packaging': '#F44336',
        }
        color = colors.get(obj.category, '#999')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.get_category_display()
        )
    category_badge.short_description = 'Категория'
    
    def is_published_badge(self, obj):
        """Статус публикации."""
        if obj.is_published:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Опубликовано</span>'
            )
        return format_html(
            '<span style="color: #999;">✗ Черновик</span>'
        )
    is_published_badge.short_description = 'Статус'
    
    def publish_items(self, request, queryset):
        """Опубликовать выбранные элементы."""
        updated = queryset.update(is_published=True)
        self.message_user(request, f'{updated} элементов опубликовано')
    publish_items.short_description = 'Опубликовать'
    
    def unpublish_items(self, request, queryset):
        """Снять с публикации."""
        updated = queryset.update(is_published=False)
        self.message_user(request, f'{updated} элементов снято с публикации')
    unpublish_items.short_description = 'Снять с публикации'


class ProductImageInline(admin.TabularInline):
    """
    Inline редактор для дополнительных изображений продукта.
    """
    model = ProductImage
    extra = 1
    fields = ('image', 'image_preview', 'caption', 'order')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        """Превью изображения."""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 100px; height: 75px; object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return '-'
    image_preview.short_description = 'Превью'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Админка для продуктов с inline галереей.
    """
    list_display = (
        'main_image_preview', 'name_ru', 'category_badge',
        'is_featured_badge', 'is_published_badge', 'order', 'gallery_count'
    )
    
    list_filter = ('category', 'is_published', 'is_featured', 'created_at')
    
    search_fields = ('name_ru', 'name_en', 'name_uz', 'description_ru', 'slug')
    
    list_editable = ('order',)
    
    prepopulated_fields = {'slug': ('name_en',)}
    
    fieldsets = (
        ('Основное изображение', {
            'fields': ('main_image', 'main_image_preview_large')
        }),
        ('Основная информация', {
            'fields': ('name_ru', 'name_en', 'name_uz', 'slug', 'category')
        }),
        ('Краткие описания', {
            'fields': ('short_description_ru', 'short_description_en', 'short_description_uz'),
            'classes': ('collapse',)
        }),
        ('Полные описания', {
            'fields': ('description_ru', 'description_en', 'description_uz')
        }),
        ('Характеристики', {
            'fields': ('features',),
            'classes': ('collapse',),
            'description': 'Формат JSON: {"ru": ["пункт 1", "пункт 2"], "en": [...], "uz": [...]}'
        }),
        ('Настройки отображения', {
            'fields': ('order', 'is_published', 'is_featured')
        }),
    )
    
    readonly_fields = ('main_image_preview_large', 'created_at', 'updated_at')
    
    inlines = [ProductImageInline]
    
    date_hierarchy = 'created_at'
    ordering = ('order', '-created_at')
    list_per_page = 20
    
    actions = ['publish_products', 'unpublish_products', 'make_featured', 'remove_featured']
    
    def main_image_preview(self, obj):
        """Превью основного изображения в списке."""
        if obj.main_image:
            return format_html(
                '<img src="{}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px;" />',
                obj.main_image.url
            )
        return '-'
    main_image_preview.short_description = 'Фото'
    
    def main_image_preview_large(self, obj):
        """Большое превью основного изображения."""
        if obj.main_image:
            return format_html(
                '<img src="{}" style="max-width: 400px; max-height: 300px; border-radius: 4px;" />',
                obj.main_image.url
            )
        return 'Изображение не загружено'
    main_image_preview_large.short_description = 'Текущее изображение'
    
    def category_badge(self, obj):
        """Цветной бейдж категории."""
        colors = {
            'woven_labels': '#4CAF50',
            'printed_labels': '#2196F3',
            'hang_tags': '#FF9800',
            'stickers': '#9C27B0',
            'packaging': '#F44336',
        }
        color = colors.get(obj.category, '#999')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.get_category_display()
        )
    category_badge.short_description = 'Категория'
    
    def is_published_badge(self, obj):
        """Статус публикации."""
        if obj.is_published:
            return format_html('<span style="color: green; font-weight: bold;">✓ Опубл.</span>')
        return format_html('<span style="color: #999;">✗ Черновик</span>')
    is_published_badge.short_description = 'Опубл.'
    
    def is_featured_badge(self, obj):
        """Избранное."""
        if obj.is_featured:
            return format_html('<span style="color: #FF9800; font-size: 16px;">⭐</span>')
        return '-'
    is_featured_badge.short_description = 'Избр.'
    
    def gallery_count(self, obj):
        """Количество фото в галерее."""
        count = obj.images.count()
        if count > 0:
            return format_html('<span style="color: #2196F3;">📷 {}</span>', count)
        return '-'
    gallery_count.short_description = 'Фото'
    
    # Bulk actions
    def publish_products(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f'{updated} продуктов опубликовано')
    publish_products.short_description = 'Опубликовать'
    
    def unpublish_products(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f'{updated} продуктов снято с публикации')
    unpublish_products.short_description = 'Снять с публикации'
    
    def make_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} продуктов добавлено в избранное')
    make_featured.short_description = 'Добавить в избранное'
    
    def remove_featured(self, request, queryset):
        updated = queryset.update(is_featured=False)
        self.message_user(request, f'{updated} продуктов убрано из избранного')
    remove_featured.short_description = 'Убрать из избранного'
