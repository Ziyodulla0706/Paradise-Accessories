#!/bin/bash
# Production startup script for Paradise Accessories

set -e

echo "Starting Paradise Accessories..."

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Start Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn -c gunicorn_config.py paradise_backend.wsgi:application
