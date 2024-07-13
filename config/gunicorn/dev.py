import multiprocessing
from os import path

base = path.realpath(path.join(
    path.dirname(__file__), '..', '..', '..', '..', 'shared')
)

user = "deploy"
group = "deploy"
bind = "127.0.0.1:8051"
workers = multiprocessing.cpu_count() * 2 + 1
pidfile = path.join(base, 'pids', 'gunicorn.pid')
errorlog = path.join(base, 'logs', 'gunicorn.error.log')
accesslog = None
loglevel = "info"
timeout = 600 * 30
