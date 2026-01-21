"""
Telegram bot integration for instant lead notifications.
"""
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_telegram_notification(lead):
    """
    Send instant notification to Telegram when a new lead is received.
    
    Args:
        lead: Lead model instance
    
    Returns:
        bool: True if successful, False otherwise
    """
    # Skip if Telegram is not configured
    if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
        logger.info("Telegram not configured, skipping notification")
        return False
    
    try:
        # Format the message
        message = f"""🆕 *Новая заявка!*

👤 *Клиент:* {lead.name}
🏢 *Компания:* {lead.company}
📞 *Телефон:* {lead.phone}
📧 *Email:* {lead.email or 'Не указан'}

📦 *Продукт:* {lead.get_product_type_display()}
🔢 *Количество:* {lead.quantity or 'Не указано'}

💬 *Сообщение:*
{lead.message[:200] if lead.message else 'Без сообщения'}{'...' if lead.message and len(lead.message) > 200 else ''}

🌐 *Язык:* {lead.language.upper()}
📁 *Файл:* {'✅ Да' if lead.file else '❌ Нет'}
🕐 *Время:* {lead.created_at.strftime('%d.%m.%Y %H:%M')}
"""
        
        # Send message to Telegram
        url = f'https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage'
        
        payload = {
            'chat_id': settings.TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'Markdown'
        }
        
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code == 200:
            logger.info(f"Telegram notification sent for Lead #{lead.id}")
            return True
        else:
            logger.error(f"Telegram API error: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        logger.error("Telegram notification timeout")
        return False
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {str(e)}")
        return False


def send_telegram_message(message, chat_id=None):
    """
    Send a custom message to Telegram.
    
    Args:
        message: str, message text
        chat_id: str, optional chat ID (uses default if not provided)
    
    Returns:
        bool: True if successful, False otherwise
    """
    if not settings.TELEGRAM_BOT_TOKEN:
        return False
    
    target_chat_id = chat_id or settings.TELEGRAM_CHAT_ID
    
    if not target_chat_id:
        return False
    
    try:
        url = f'https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage'
        
        payload = {
            'chat_id': target_chat_id,
            'text': message,
            'parse_mode': 'Markdown'
        }
        
        response = requests.post(url, json=payload, timeout=10)
        return response.status_code == 200
        
    except Exception as e:
        logger.error(f"Failed to send Telegram message: {str(e)}")
        return False
