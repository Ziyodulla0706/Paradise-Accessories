from django.db import models


class Lead(models.Model):
    """
    Model for storing contact form submissions / leads.
    """
    STATUS_CHOICES = [
        ('new', 'Новый'),
        ('contacted', 'Связались'),
        ('qualified', 'Квалифицирован'),
        ('closed', 'Закрыт'),
        ('rejected', 'Отклонен'),
    ]
    
    PRODUCT_TYPE_CHOICES = [
        ('woven', 'Вшивные этикетки'),
        ('printed', 'Печатные этикетки'),
        ('hang_tags', 'Навесные бирки'),
        ('stickers', 'Стикеры'),
        ('other', 'Другое'),
    ]
    
    # Contact Information
    name = models.CharField('Имя', max_length=200)
    company = models.CharField('Компания', max_length=200)
    phone = models.CharField('Телефон', max_length=50)
    email = models.EmailField('Email', blank=True, null=True)
    
    # Request Details
    product_type = models.CharField('Тип продукта', max_length=100, choices=PRODUCT_TYPE_CHOICES)
    quantity = models.IntegerField('Количество', blank=True, null=True)
    message = models.TextField('Сообщение', blank=True)
    file = models.FileField('Файл', upload_to='leads/%Y/%m/', blank=True, null=True)
    
    # Lead Management
    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='new')
    
    # Metadata
    source = models.CharField('Источник', max_length=100, blank=True, help_text='Откуда пришла заявка')
    language = models.CharField('Язык', max_length=10, default='ru')
    ip_address = models.GenericIPAddressField('IP адрес', blank=True, null=True)
    user_agent = models.TextField('User Agent', blank=True)
    
    # Timestamps
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)
    
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status']),
            models.Index(fields=['product_type']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.company} ({self.get_status_display()})"
    
    def get_product_type_display_en(self):
        """Get product type in English for notifications."""
        mapping = {
            'woven': 'Woven Labels',
            'printed': 'Printed Labels',
            'hang_tags': 'Hang Tags',
            'stickers': 'Stickers',
            'other': 'Other',
        }
        return mapping.get(self.product_type, self.product_type)
