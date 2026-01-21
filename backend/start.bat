@echo off
REM Production startup script for Paradise Accessories (Windows)

echo Starting Paradise Accessories...

REM Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
)

REM Collect static files
echo Collecting static files...
python manage.py collectstatic --noinput

REM Run migrations
echo Running database migrations...
python manage.py migrate --noinput

REM Start Gunicorn
echo Starting Gunicorn server...
gunicorn -c gunicorn_config.py paradise_backend.wsgi:application
