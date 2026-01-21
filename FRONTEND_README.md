# 🎨 Paradise Accessories - Frontend

Современный Next.js фронтенд с TypeScript, мультиязычностью, темной/светлой темой и плавными анимациями.

## ✨ Особенности

- ✅ **Next.js 14** с App Router
- ✅ **TypeScript** - полная типизация
- ✅ **Tailwind CSS** - современная стилизация
- ✅ **next-intl** - мультиязычность (ru/en/uz)
- ✅ **Framer Motion** - плавные анимации
- ✅ **Dark/Light Theme** - система тем с сохранением
- ✅ **SEO оптимизация** - мета-теги и структурированные данные
- ✅ **Адаптивный дизайн** - mobile-first подход
- ✅ **API клиент** - готов к интеграции с Django

## 🚀 Быстрый старт

```bash
# Установка зависимостей
cd frontend
npm install

# Создание .env.local
cp .env.example .env.local
# Отредактируйте .env.local

# Запуск dev сервера
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 📁 Структура

```
frontend/
├── app/
│   ├── [locale]/          # Локализованные страницы
│   │   ├── page.tsx       # Главная
│   │   ├── about/         # О компании
│   │   ├── contacts/      # Контакты
│   │   └── layout.tsx    # Layout с i18n
│   ├── globals.css        # Глобальные стили
│   └── layout.tsx         # Root layout
├── components/
│   ├── sections/          # Секции страниц
│   ├── header.tsx        # Навигация
│   ├── footer.tsx        # Футер
│   ├── theme-toggle.tsx  # Переключатель темы
│   └── language-switcher.tsx
├── hooks/
│   └── use-theme.ts      # Хук для темы
├── i18n/
│   ├── routing.ts        # Конфигурация маршрутизации
│   └── request.ts        # Конфигурация запросов
├── lib/
│   ├── api.ts            # API клиент для Django
│   └── theme.ts          # Утилиты темы
└── messages/             # Переводы
    ├── ru.json
    ├── en.json
    └── uz.json
```

## 🌍 Языки

- 🇷🇺 Русский (ru) - `/ru/`
- 🇬🇧 English (en) - `/en/`
- 🇺🇿 O'zbek (uz) - `/uz/`

## 🎨 Темы

- **Light** - Светлая тема (по умолчанию)
- **Dark** - Темная тема

Тема сохраняется в localStorage и автоматически применяется.

## 🔌 Интеграция с Django

API клиент готов в `lib/api.ts`. См. `INTEGRATION_GUIDE.md` для деталей.

## 📱 Адаптивность

- 📱 Mobile: 320px+
- 📱 Tablet: 768px+
- 💻 Desktop: 1024px+
- 🖥️ Large: 1440px+

## 🚀 Деплой

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel
```

### Другие платформы

```bash
npm run build
npm start
```

## 📝 Документация

- `README.md` - Основная документация
- `INTEGRATION_GUIDE.md` - Интеграция с Django
- `FRONTEND_SETUP.md` - Настройка

## 🎯 TODO

- [x] Базовая структура Next.js
- [x] i18n (ru/en/uz)
- [x] Dark/Light theme
- [x] Анимации (Framer Motion)
- [x] Главная страница
- [x] Контактная форма
- [x] API клиент
- [x] SEO мета-теги
- [ ] Страницы: Catalog, Portfolio, Pricing
- [ ] Интеграция с Django API
- [ ] Google Analytics
- [ ] Оптимизация изображений

---

**Готов к production использованию!** 🚀
