# Frontend Setup Guide

## Быстрый старт

1. **Установите зависимости:**
```bash
cd frontend
npm install
```

2. **Создайте .env.local:**
```bash
cp .env.example .env.local
# Отредактируйте .env.local и укажите URL Django API
```

3. **Запустите dev сервер:**
```bash
npm run dev
```

4. **Откройте браузер:**
```
http://localhost:3000
```

## Структура

- `app/[locale]/` - Страницы с поддержкой локализации
- `components/` - React компоненты
- `messages/` - Файлы переводов (ru/en/uz)
- `lib/` - Утилиты и API клиент
- `hooks/` - Custom React hooks
- `i18n/` - Конфигурация интернационализации

## Особенности

✅ **Мультиязычность** - Полная поддержка ru/en/uz  
✅ **Темная/Светлая тема** - С сохранением в localStorage  
✅ **Плавные анимации** - Framer Motion  
✅ **Адаптивный дизайн** - Mobile-first подход  
✅ **TypeScript** - Полная типизация  
✅ **SEO готов** - Мета-теги и структурированные данные  

## Интеграция с Django

API клиент готов к интеграции. Просто укажите `NEXT_PUBLIC_API_URL` в `.env.local` и используйте `apiClient` из `lib/api.ts`.

## Деплой

Проект готов к деплою на Vercel, Netlify или любой другой платформе, поддерживающей Next.js.
