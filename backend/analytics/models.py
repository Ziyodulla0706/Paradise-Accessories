from django.db import models


class AnalyticsEvent(models.Model):
    """
    Model for tracking analytics events like page views, form interactions, etc.
    """
    EVENT_TYPE_CHOICES = [
        ('page_view', 'Page View'),
        ('form_submit', 'Form Submission'),
        ('form_start', 'Form Started'),
        ('file_upload', 'File Upload'),
        ('button_click', 'Button Click'),
        ('link_click', 'Link Click'),
    ]
    
    # Event Information
    event_type = models.CharField('Тип события', max_length=50, choices=EVENT_TYPE_CHOICES, db_index=True)
    page = models.CharField('Страница', max_length=500)
    language = models.CharField('Язык', max_length=10, db_index=True)
    
    # Tracking Information
    referrer = models.CharField('Реферер', max_length=500, blank=True)
    ip_address = models.GenericIPAddressField('IP адрес', blank=True, null=True)
    user_agent = models.TextField('User Agent', blank=True)
    session_id = models.CharField('Session ID', max_length=100, db_index=True)
    
    # Additional Data
    metadata = models.JSONField('Метаданные', default=dict, blank=True, help_text='Дополнительные данные события')
    
    # Timestamp
    timestamp = models.DateTimeField('Время', auto_now_add=True, db_index=True)
    
    class Meta:
        verbose_name = 'Событие аналитики'
        verbose_name_plural = 'События аналитики'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['-timestamp']),
            models.Index(fields=['event_type', '-timestamp']),
            models.Index(fields=['session_id', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.get_event_type_display()} - {self.page} ({self.timestamp})"
