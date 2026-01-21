# Paradise Accessories - Deployment Guide

## Production Checklist

### 1. Backend Configuration

#### Environment Variables (.env)
```env
DEBUG=False
SECRET_KEY=your-production-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@localhost:5432/paradise_db

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=your-email@gmail.com

# Telegram (Optional)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

#### Database Setup
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

### 2. Frontend Configuration

#### API Configuration
Update `assets/js/config.js`:
```javascript
window.API_CONFIG = {
    baseURL: 'https://api.yourdomain.com',  // or leave empty for same origin
    // ... rest of config
};
```

#### Google Analytics
Update `GA_MEASUREMENT_ID` in `assets/js/config.js` and all HTML files where Google Analytics is loaded.

### 3. Static Files

#### Collect Static Files (Django)
```bash
cd backend
python manage.py collectstatic --noinput
```

#### Serve Static Files
- Configure nginx/Apache to serve static files from `backend/staticfiles/`
- Serve frontend HTML/CSS/JS from appropriate directory

### 4. Web Server Configuration (Nginx Example)

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend static files
    location / {
        root /path/to/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Django admin and static
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /path/to/backend/staticfiles/;
    }

    location /media/ {
        alias /path/to/backend/media/;
    }
}
```

### 5. Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` generated
- [ ] Allowed hosts configured
- [ ] HTTPS enabled with valid SSL certificate
- [ ] CORS configured for production domain only
- [ ] Rate limiting enabled (default: 5 requests/hour per IP)
- [ ] Database backups configured
- [ ] Environment variables secured (not in repository)
- [ ] Static files served securely

### 6. Performance Optimization

#### Enable Gzip Compression
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

#### Cache Static Files
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 7. Monitoring & Logging

- Set up error tracking (Sentry, Rollbar, etc.)
- Configure log rotation
- Monitor server resources (CPU, memory, disk)
- Set up uptime monitoring

### 8. Backup Strategy

- Daily database backups
- Regular media file backups
- Test restore procedures

## Post-Deployment

1. Test all forms and API endpoints
2. Verify email notifications work
3. Check Telegram notifications (if configured)
4. Test language switching
5. Verify all pages load correctly
6. Check mobile responsiveness
7. Test file uploads
8. Verify analytics tracking

## Rollback Procedure

1. Restore previous version from backup
2. Restore database if needed
3. Clear caches
4. Verify site functionality

## Support

For issues or questions, contact the development team.
