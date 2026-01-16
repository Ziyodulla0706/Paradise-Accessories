"""
Email notification utilities for Paradise Accessories backend.
"""
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_lead_notification(lead):
    """
    Send email notification to admin when a new lead is received.
    
    Args:
        lead: Lead model instance
    """
    try:
        subject = f'🆕 Новая заявка от {lead.company}'
        
        # Prepare context for email template
        context = {
            'lead': lead,
            'admin_url': f'{settings.ALLOWED_HOSTS[0]}/admin/leads/lead/{lead.id}/' if settings.ALLOWED_HOSTS else '',
        }
        
        # Plain text message
        text_content = f"""
Новая заявка!

Контактное лицо: {lead.name}
Компания: {lead.company}
Телефон: {lead.phone}
Email: {lead.email or 'Не указан'}

Тип продукта: {lead.get_product_type_display()}
Количество: {lead.quantity or 'Не указано'}
Сообщение: {lead.message}

Язык: {lead.language.upper()}
Дата: {lead.created_at.strftime('%d.%m.%Y %H:%M')}

---
Paradise Accessories CRM
        """
        
        # HTML message (if we have a template)
        try:
            html_content = render_to_string('emails/lead_notification.html', context)
        except:
            html_content = None
        
        # Send email
        if html_content:
            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.ADMIN_EMAIL]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        else:
            send_mail(
                subject=subject,
                message=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        
        logger.info(f"Lead notification email sent for Lead #{lead.id}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send lead notification email: {str(e)}")
        return False


def send_auto_reply(lead):
    """
    Send automatic thank you email to the customer.
    
    Args:
        lead: Lead model instance
    """
    if not lead.email:
        return False
    
    try:
        subject = 'Спасибо за вашу заявку - Paradise Accessories'
        
        # Language-specific messages
        messages = {
            'ru': f"""
Здравствуйте, {lead.name}!

Спасибо за ваш интерес к продукции Paradise Accessories!

Мы получили вашу заявку на "{lead.get_product_type_display()}" и свяжемся с вами в ближайшее время.

Наши специалисты готовы ответить на все ваши вопросы и помочь с выбором оптимального решения для вашего бизнеса.

С уважением,
Команда Paradise Accessories
            """,
            'en': f"""
Hello, {lead.name}!

Thank you for your interest in Paradise Accessories products!

We have received your request for "{lead.get_product_type_display_en()}" and will contact you shortly.

Our specialists are ready to answer all your questions and help you choose the best solution for your business.

Best regards,
Paradise Accessories Team
            """,
            'uz': f"""
Assalomu alaykum, {lead.name}!

Paradise Accessories mahsulotlariga qiziqish bildirganingiz uchun rahmat!

Biz "{lead.get_product_type_display()}" bo'yicha so'rovingizni oldik va tez orada siz bilan bog'lanamiz.

Mutaxassislarimiz barcha savollaringizga javob berishga va biznesingiz uchun eng yaxshi yechimni tanlashda yordam berishga tayyor.

Hurmat bilan,
Paradise Accessories jamoasi
            """
        }
        
        message = messages.get(lead.language, messages['ru'])
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[lead.email],
            fail_silently=False,
        )
        
        logger.info(f"Auto-reply email sent to {lead.email} for Lead #{lead.id}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send auto-reply email: {str(e)}")
        return False
