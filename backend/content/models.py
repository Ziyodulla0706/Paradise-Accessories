from django.db import models
from django.utils.text import slugify


class PortfolioItem(models.Model):
    """
    Элемент портфолио с мультиязычной поддержкой.
    """
    CATEGORY_CHOICES = [
        ('woven', 'Вшивные этикетки'),
        ('printed', 'Печатные этикетки'),
        ('hang_tags', 'Навесные бирки'),
        ('stickers', 'Стикеры'),
        ('packaging', 'Упаковка'),
    ]
    
    # Изображение
    image = models.ImageField('Изображение', upload_to='portfolio/%Y/%m/')
    
    # Названия на разных языках
    title_ru = models.CharField('Название (RU)', max_length=200)
    title_en = models.CharField('Название (EN)', max_length=200, blank=True)
    title_uz = models.CharField('Название (UZ)', max_length=200, blank=True)
    
    # Описания на разных языках
    description_ru = models.TextField('Описание (RU)')
    description_en = models.TextField('Описание (EN)', blank=True)
    description_uz = models.TextField('Описание (UZ)', blank=True)
    
    # Категория
    category = models.CharField('Категория', max_length=100, choices=CATEGORY_CHOICES)
    
    # Управление отображением
    order = models.IntegerField('Порядок', default=0, help_text='Чем меньше число, тем выше в списке')
    is_published = models.BooleanField('Опубликовано', default=True)
    
    # Временные метки
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Элемент портфолио'
        verbose_name_plural = 'Портфолио'
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['order']),
            models.Index(fields=['category']),
            models.Index(fields=['is_published']),
        ]
    
    def __str__(self):
        return self.title_ru
    
    def get_title(self, language='ru'):
        """Получить название на нужном языке."""
        return getattr(self, f'title_{language}', self.title_ru) or self.title_ru
    
    def get_description(self, language='ru'):
        """Получить описание на нужном языке."""
        return getattr(self, f'description_{language}', self.description_ru) or self.description_ru


class Product(models.Model):
    """
    Модель продукта с мультиязычной поддержкой и галереей изображений.
    """
    CATEGORY_CHOICES = [
        ('woven_labels', 'Вшивные этикетки'),
        ('printed_labels', 'Печатные этикетки'),
        ('hang_tags', 'Навесные бирки'),
        ('stickers', 'Стикеры'),
        ('packaging', 'Упаковка'),
    ]
    
    # Основное изображение
    main_image = models.ImageField('Основное изображение', upload_to='products/%Y/%m/')
    
    # Slug для URL
    slug = models.SlugField('URL slug', unique=True, max_length=200)
    
    # Названия на разных языках
    name_ru = models.CharField('Название (RU)', max_length=200)
    name_en = models.CharField('Название (EN)', max_length=200, blank=True)
    name_uz = models.CharField('Название (UZ)', max_length=200, blank=True)
    
    # Краткие описания
    short_description_ru = models.CharField('Краткое описание (RU)', max_length=300, blank=True)
    short_description_en = models.CharField('Краткое описание (EN)', max_length=300, blank=True)
    short_description_uz = models.CharField('Краткое описание (UZ)', max_length=300, blank=True)
    
    # Полные описания
    description_ru = models.TextField('Описание (RU)')
    description_en = models.TextField('Описание (EN)', blank=True)
    description_uz = models.TextField('Описание (UZ)', blank=True)
    
    # Категория
    category = models.CharField('Категория', max_length=100, choices=CATEGORY_CHOICES)
    
    # Характеристики и особенности (JSON)
    features = models.JSONField(
        'Характеристики',
        default=dict,
        blank=True,
        help_text='Формат: {"ru": ["пункт 1", "пункт 2"], "en": [...], "uz": [...]}'
    )
    
    # Управление отображением
    order = models.IntegerField('Порядок', default=0, help_text='Чем меньше число, тем выше в списке')
    is_published = models.BooleanField('Опубликовано', default=True)
    is_featured = models.BooleanField('Избранное', default=False, help_text='Показывать на главной странице')
    
    # Временные метки
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукция'
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category']),
            models.Index(fields=['is_published']),
            models.Index(fields=['is_featured']),
        ]
    
    def __str__(self):
        return self.name_ru
    
    def save(self, *args, **kwargs):
        """Автогенерация slug из названия."""
        if not self.slug:
            self.slug = slugify(self.name_en or self.name_ru)
        super().save(*args, **kwargs)
    
    def get_name(self, language='ru'):
        """Получить название на нужном языке."""
        return getattr(self, f'name_{language}', self.name_ru) or self.name_ru
    
    def get_short_description(self, language='ru'):
        """Получить краткое описание на нужном языке."""
        return getattr(self, f'short_description_{language}', self.short_description_ru) or self.short_description_ru
    
    def get_description(self, language='ru'):
        """Получить описание на нужном языке."""
        return getattr(self, f'description_{language}', self.description_ru) or self.description_ru
    
    def get_features(self, language='ru'):
        """Получить характеристики на нужном языке."""
        return self.features.get(language, self.features.get('ru', []))


class ProductImage(models.Model):
    """
    Дополнительные изображения для продукта (галерея).
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name='Продукт'
    )
    image = models.ImageField('Изображение', upload_to='products/gallery/%Y/%m/')
    caption = models.CharField('Подпись', max_length=200, blank=True)
    order = models.IntegerField('Порядок', default=0)
    
    class Meta:
        verbose_name = 'Изображение продукта'
        verbose_name_plural = 'Изображения продукта'
        ordering = ['order', 'id']
    
    def __str__(self):
        return f'{self.product.name_ru} - Фото {self.id}'
