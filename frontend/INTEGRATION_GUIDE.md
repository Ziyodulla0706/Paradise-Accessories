# Руководство по интеграции Frontend с Django Backend

## Обзор

Frontend на Next.js готов к интеграции с Django backend. API клиент уже настроен и готов к использованию.

## Настройка

### 1. Переменные окружения

Создайте `.env.local` в папке `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Запуск Django Backend

```bash
cd backend
python manage.py runserver
```

Backend будет доступен на `http://localhost:8000`

### 3. Запуск Next.js Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на `http://localhost:3000`

## API Интеграция

### Использование API клиента

```typescript
import { apiClient } from '@/lib/api';

// Отправка контактной формы
const response = await apiClient.submitContactForm({
  name: 'Иван Иванов',
  company: 'ООО Компания',
  phone: '+998901234567',
  email: 'ivan@example.com',
  product_type: 'woven',
  quantity: 1000,
  message: 'Интересуют вшивные этикетки',
  language: 'ru',
});

if (response.success) {
  console.log('Lead ID:', response.data?.lead_id);
} else {
  console.error('Error:', response.error);
}
```

### Доступные методы API

- `submitContactForm()` - Отправка контактной формы
- `getPortfolio()` - Получение портфолио
- `getProducts()` - Получение продуктов
- `trackAnalytics()` - Отслеживание аналитики

## CORS Настройка

Убедитесь, что в Django `settings.py` настроен CORS:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
```

## Production Deployment

### Frontend (Vercel)

1. Подключите репозиторий к Vercel
2. Установите переменные окружения:
   - `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
3. Deploy

### Backend (VPS/Server)

Следуйте инструкциям в `PRODUCTION_SETUP.md`

## Тестирование интеграции

1. Заполните контактную форму на фронтенде
2. Проверьте, что заявка появилась в Django admin
3. Проверьте email уведомления (если настроены)
4. Проверьте Telegram уведомления (если настроены)

## Troubleshooting

### CORS ошибки

Убедитесь, что `CORS_ALLOWED_ORIGINS` в Django включает URL фронтенда.

### 404 на API endpoints

Проверьте, что Django сервер запущен и доступен по указанному URL.

### Ошибки валидации

Проверьте формат данных, отправляемых в API. См. документацию в `lib/api.ts`.
