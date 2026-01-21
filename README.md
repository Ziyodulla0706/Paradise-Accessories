# Paradise Accessories Website

Multilingual B2B corporate website with Django backend and React admin panel.

## Project Structure

```
Сайт Этикетка/
├── backend/                 # Django backend
│   ├── paradise_backend/    # Main project
│   ├── leads/               # Leads management app
│   ├── analytics/           # Analytics app
│   └── manage.py
├── admin-frontend/          # React admin panel
├── ru/                      # Russian website
├── en/                      # English website
├── uz/                      # Uzbek website
├── assets/                  # Static assets
└── requirements.txt         # Python dependencies
```

## Setup Instructions

### 1. Backend Setup (Django)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your credentials

# Initialize Django project
cd backend
python manage.py migrate
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Access backend API: http://localhost:8000/api/
Access Django admin: http://localhost:8000/admin/

### 2. Frontend Setup (React Admin Panel)

```bash
cd admin-frontend
npm install
npm start
```

Access React admin: http://localhost:3000/

## Configuration

### Gmail Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate App Password (Security → App passwords)
4. Use the generated password in `.env` as `EMAIL_HOST_PASSWORD`

### Telegram Setup (Optional)

1. Create a bot via [@BotFather](https://t.me/botfather)
2. Get bot token
3. Get your chat/channel ID
4. Add to `.env`:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```

## API Endpoints

### Public Endpoints
- `POST /api/contact/submit/` - Submit contact form
- `POST /api/analytics/track/` - Track analytics event

### Protected Endpoints (require authentication)
- `GET /api/leads/` - Get all leads
- `GET /api/leads/{id}/` - Get lead detail
- `PUT /api/leads/{id}/` - Update lead
- `DELETE /api/leads/{id}/` - Delete lead
- `GET /api/leads/export/csv/` - Export to CSV
- `GET /api/analytics/stats/` - Get analytics statistics

## Features

- ✅ Multilingual support (RU, EN, UZ)
- ✅ Contact form with validation
- ✅ File upload support
- ✅ Email notifications (Gmail SMTP)
- ✅ Telegram notifications
- ✅ Django admin interface
- ✅ Modern React admin panel
- ✅ Analytics tracking
- ✅ CSV export
- ✅ Rate limiting & security

## Tech Stack

**Backend:**
- Django 5.0
- Django REST Framework
- PostgreSQL (production) / SQLite (development)

**Frontend:**
- React 18
- Material-UI
- Recharts (analytics)
- Axios

## Deployment

(Instructions will be added when deploying to production server)
