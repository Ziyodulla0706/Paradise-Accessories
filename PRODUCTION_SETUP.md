# Production Setup Guide - Paradise Accessories

Полное руководство по развертыванию Django проекта Paradise Accessories в production окружении.

## 📋 Содержание

1. [Предварительные требования](#предварительные-требования)
2. [Настройка сервера](#настройка-сервера)
3. [Установка зависимостей](#установка-зависимостей)
4. [Настройка базы данных](#настройка-базы-данных)
5. [Конфигурация окружения](#конфигурация-окружения)
6. [Развертывание приложения](#развертывание-приложения)
7. [Настройка веб-сервера](#настройка-веб-сервера)
8. [SSL/HTTPS](#sslhttps)
9. [Мониторинг и логирование](#мониторинг-и-логирование)
10. [Резервное копирование](#резервное-копирование)
11. [Обновление приложения](#обновление-приложения)

---

## 🔧 Предварительные требования

### Системные требования

- **OS:** Ubuntu 20.04+ / Debian 11+ / CentOS 8+ / Windows Server
- **Python:** 3.10 или выше
- **PostgreSQL:** 12+ (для production)
- **Nginx:** 1.18+ (рекомендуется)
- **RAM:** Минимум 2GB (рекомендуется 4GB+)
- **Диск:** Минимум 10GB свободного места

### Установка системных пакетов (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install -y python3.10 python3.10-venv python3-pip postgresql postgresql-contrib nginx git
```

---

## 🖥️ Настройка сервера

### 1. Создание пользователя для приложения

```bash
sudo adduser --disabled-password --gecos "" paradise
sudo usermod -aG sudo paradise
sudo su - paradise
```

### 2. Клонирование проекта

```bash
cd /home/paradise
git clone <repository-url> paradise-accessories
cd paradise-accessories/Paradise-Accessories
```

### 3. Создание виртуального окружения

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r ../requirements.txt
```

---

## 🗄️ Настройка базы данных

### 1. Создание базы данных PostgreSQL

```bash
sudo -u postgres psql
```

В PostgreSQL консоли:

```sql
CREATE DATABASE paradise_db;
CREATE USER paradise_user WITH PASSWORD 'your_secure_password';
ALTER ROLE paradise_user SET client_encoding TO 'utf8';
ALTER ROLE paradise_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE paradise_user SET timezone TO 'Asia/Tashkent';
GRANT ALL PRIVILEGES ON DATABASE paradise_db TO paradise_user;
\q
```

### 2. Настройка подключения

Добавьте в `.env`:

```env
DATABASE_URL=postgresql://paradise_user:your_secure_password@localhost:5432/paradise_db
DB_CONN_MAX_AGE=600
DB_CONN_TIMEOUT=30
```

---

## ⚙️ Конфигурация окружения

### 1. Создание .env файла

```bash
cd /home/paradise/paradise-accessories/Paradise-Accessories
cp backend/env.example .env
nano .env
```

### 2. Обязательные настройки для production

```env
# Django
DEBUG=False
SECRET_KEY=<generate-new-secret-key>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com

# Database
DATABASE_URL=postgresql://paradise_user:password@localhost:5432/paradise_db

# CORS & CSRF
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@yourdomain.com

# Telegram (optional)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Logging
LOG_LEVEL=INFO
LOG_FILE_PATH=/var/log/paradise_accessories/django.log

# Static & Media
STATIC_URL=/static/
MEDIA_URL=/media/
```

### 3. Генерация SECRET_KEY

```bash
cd backend
source venv/bin/activate
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 🚀 Развертывание приложения

### 1. Применение миграций

```bash
cd backend
source venv/bin/activate
python manage.py migrate
```

### 2. Создание суперпользователя

```bash
python manage.py createsuperuser
```

### 3. Сбор статических файлов

```bash
python manage.py collectstatic --noinput
```

### 4. Создание директорий для логов

```bash
sudo mkdir -p /var/log/paradise_accessories
sudo chown paradise:paradise /var/log/paradise_accessories
```

### 5. Тестирование приложения

```bash
python manage.py check --deploy
python manage.py runserver 0.0.0.0:8000
```

Проверьте:
- http://yourdomain.com/api/health/ - должен вернуть 200 OK
- http://yourdomain.com/admin/ - доступ к админ-панели

---

## 🌐 Настройка веб-сервера

### Nginx конфигурация

Создайте файл `/etc/nginx/sites-available/paradise-accessories`:

```nginx
# Upstream для Gunicorn
upstream paradise_backend {
    server 127.0.0.1:8000 fail_timeout=0;
}

# HTTP -> HTTPS редирект
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS сервер
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Логи
    access_log /var/log/nginx/paradise-access.log;
    error_log /var/log/nginx/paradise-error.log;

    # Максимальный размер загружаемых файлов
    client_max_body_size 10M;

    # Статические файлы
    location /static/ {
        alias /home/paradise/paradise-accessories/Paradise-Accessories/backend/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Медиа файлы
    location /media/ {
        alias /home/paradise/paradise-accessories/Paradise-Accessories/backend/media/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Frontend assets
    location /assets/ {
        alias /home/paradise/paradise-accessories/Paradise-Accessories/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Frontend HTML files
    location / {
        root /home/paradise/paradise-accessories/Paradise-Accessories;
        try_files $uri $uri/ /ru/index.html;
        index index.html;
    }

    # API endpoints
    location /api/ {
        proxy_pass http://paradise_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        proxy_read_timeout 120s;
    }

    # Django Admin
    location /admin/ {
        proxy_pass http://paradise_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # Health check
    location /api/health/ {
        proxy_pass http://paradise_backend;
        proxy_set_header Host $host;
        access_log off;
    }
}
```

### Активация конфигурации

```bash
sudo ln -s /etc/nginx/sites-available/paradise-accessories /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 SSL/HTTPS

### Установка Let's Encrypt (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot автоматически обновит конфигурацию Nginx и настроит автообновление сертификатов.

---

## 🔄 Systemd Service для Gunicorn

Создайте файл `/etc/systemd/system/paradise-accessories.service`:

```ini
[Unit]
Description=Paradise Accessories Gunicorn daemon
After=network.target postgresql.service

[Service]
User=paradise
Group=paradise
WorkingDirectory=/home/paradise/paradise-accessories/Paradise-Accessories/backend
Environment="PATH=/home/paradise/paradise-accessories/Paradise-Accessories/backend/venv/bin"
ExecStart=/home/paradise/paradise-accessories/Paradise-Accessories/backend/venv/bin/gunicorn \
    -c gunicorn_config.py \
    paradise_backend.wsgi:application

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Управление сервисом

```bash
sudo systemctl daemon-reload
sudo systemctl enable paradise-accessories
sudo systemctl start paradise-accessories
sudo systemctl status paradise-accessories
```

---

## 📊 Мониторинг и логирование

### Просмотр логов

```bash
# Django логи
tail -f /var/log/paradise_accessories/django.log

# Gunicorn логи
sudo journalctl -u paradise-accessories -f

# Nginx логи
sudo tail -f /var/log/nginx/paradise-access.log
sudo tail -f /var/log/nginx/paradise-error.log
```

### Health Check

Настройте мониторинг на endpoint:
```
GET https://yourdomain.com/api/health/
```

Ожидаемый ответ:
```json
{
    "status": "healthy",
    "service": "Paradise Accessories API",
    "version": "1.0.0",
    "checks": {
        "database": {"status": "healthy", ...},
        "settings": {"status": "healthy", ...}
    }
}
```

---

## 💾 Резервное копирование

### Скрипт резервного копирования

Создайте `/home/paradise/backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/paradise/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Database backup
pg_dump -U paradise_user paradise_db | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Media files backup
tar -czf $BACKUP_DIR/media_$DATE.tar.gz /home/paradise/paradise-accessories/Paradise-Accessories/backend/media/

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

### Настройка cron для автоматических бэкапов

```bash
crontab -e
```

Добавьте:
```
0 2 * * * /home/paradise/backup.sh >> /var/log/backup.log 2>&1
```

---

## 🔄 Обновление приложения

### Процедура обновления

```bash
cd /home/paradise/paradise-accessories/Paradise-Accessories

# 1. Создать бэкап
/home/paradise/backup.sh

# 2. Остановить сервис
sudo systemctl stop paradise-accessories

# 3. Обновить код
git pull origin main

# 4. Обновить зависимости
cd backend
source venv/bin/activate
pip install -r ../requirements.txt

# 5. Применить миграции
python manage.py migrate

# 6. Собрать статические файлы
python manage.py collectstatic --noinput

# 7. Перезапустить сервис
sudo systemctl start paradise-accessories

# 8. Проверить статус
sudo systemctl status paradise-accessories
curl https://yourdomain.com/api/health/
```

---

## ✅ Чеклист перед запуском

- [ ] `DEBUG=False` в `.env`
- [ ] Новый `SECRET_KEY` сгенерирован
- [ ] `ALLOWED_HOSTS` настроен правильно
- [ ] База данных PostgreSQL создана и настроена
- [ ] Миграции применены
- [ ] Суперпользователь создан
- [ ] Статические файлы собраны
- [ ] Email настройки проверены
- [ ] Telegram бот настроен (опционально)
- [ ] Nginx конфигурация проверена
- [ ] SSL сертификат установлен
- [ ] Gunicorn сервис запущен и включен
- [ ] Health check endpoint работает
- [ ] Резервное копирование настроено
- [ ] Логирование настроено
- [ ] Firewall настроен (только необходимые порты)

---

## 🆘 Troubleshooting

### Проблема: 502 Bad Gateway

**Решение:**
```bash
# Проверить статус Gunicorn
sudo systemctl status paradise-accessories

# Проверить логи
sudo journalctl -u paradise-accessories -n 50

# Перезапустить сервис
sudo systemctl restart paradise-accessories
```

### Проблема: Статические файлы не загружаются

**Решение:**
```bash
cd backend
python manage.py collectstatic --noinput
sudo chown -R paradise:paradise staticfiles/
```

### Проблема: Ошибки подключения к базе данных

**Решение:**
```bash
# Проверить статус PostgreSQL
sudo systemctl status postgresql

# Проверить подключение
psql -U paradise_user -d paradise_db -h localhost
```

---

## 📞 Поддержка

При возникновении проблем проверьте:
1. Логи Django: `/var/log/paradise_accessories/django.log`
2. Логи Gunicorn: `sudo journalctl -u paradise-accessories`
3. Логи Nginx: `/var/log/nginx/paradise-error.log`
4. Health check endpoint: `/api/health/`

---

**Последнее обновление:** Январь 2026
