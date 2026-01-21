"""
Gunicorn configuration file for Paradise Accessories.

Usage:
    gunicorn -c gunicorn_config.py paradise_backend.wsgi:application
"""
import multiprocessing
import os

# Server socket
bind = os.environ.get('GUNICORN_BIND', '0.0.0.0:8000')
backlog = 2048

# Worker processes
workers = int(os.environ.get('GUNICORN_WORKERS', multiprocessing.cpu_count() * 2 + 1))
worker_class = 'sync'
worker_connections = 1000
timeout = int(os.environ.get('GUNICORN_TIMEOUT', 120))
keepalive = 5

# Logging
accesslog = os.environ.get('GUNICORN_ACCESS_LOG', '-')  # '-' means stdout
errorlog = os.environ.get('GUNICORN_ERROR_LOG', '-')  # '-' means stderr
loglevel = os.environ.get('GUNICORN_LOG_LEVEL', 'info')
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = 'paradise_accessories'

# Server mechanics
daemon = False
pidfile = os.environ.get('GUNICORN_PIDFILE', None)
umask = 0
user = None
group = None
tmp_upload_dir = None

# SSL (if needed)
# keyfile = '/path/to/keyfile'
# certfile = '/path/to/certfile'

# Performance
max_requests = 1000
max_requests_jitter = 50
preload_app = True

# Graceful timeout for worker restart
graceful_timeout = 30
