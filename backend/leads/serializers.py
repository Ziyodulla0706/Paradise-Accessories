from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    """
    Full serializer for Lead model (for admin operations).
    """
    product_type_display = serializers.CharField(source='get_product_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Lead
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'ip_address', 'user_agent')


class LeadCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new leads (from contact form).
    Validates file uploads and required fields.
    """
    class Meta:
        model = Lead
        fields = [
            'name', 'company', 'phone', 'email',
            'product_type', 'quantity', 'message', 'file',
            'language', 'source'
        ]
    
    def validate_phone(self, value):
        """Validate phone number format."""
        # Remove spaces and special characters for validation
        cleaned = ''.join(c for c in value if c.isdigit() or c == '+')
        if len(cleaned) < 9:
            raise serializers.ValidationError("Номер телефона слишком короткий")
        return value
    
    def validate_file(self, value):
        """Validate uploaded file."""
        if value:
            # Check file size (10MB max)
            if value.size > 10 * 1024 * 1024:
                raise serializers.ValidationError("Размер файла не должен превышать 10 МБ")
            
            # Check file extension
            allowed_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif']
            ext = '.' + value.name.split('.')[-1].lower() if '.' in value.name else ''
            if ext not in allowed_extensions:
                raise serializers.ValidationError(
                    f"Недопустимый формат файла. Разрешены: {', '.join(allowed_extensions)}"
                )
        
        return value


class LeadListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for listing leads.
    """
    product_type_display = serializers.CharField(source='get_product_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Lead
        fields = [
            'id', 'name', 'company', 'phone', 'email',
            'product_type', 'product_type_display',
            'status', 'status_display',
            'created_at', 'language'
        ]


class LeadStatsSerializer(serializers.Serializer):
    """
    Serializer for lead statistics.
    """
    total_leads = serializers.IntegerField()
    new_leads = serializers.IntegerField()
    contacted_leads = serializers.IntegerField()
    qualified_leads = serializers.IntegerField()
    closed_leads = serializers.IntegerField()
    leads_this_week = serializers.IntegerField()
    leads_this_month = serializers.IntegerField()
    by_product_type = serializers.DictField()
    by_language = serializers.DictField()
    recent_leads = LeadListSerializer(many=True)
