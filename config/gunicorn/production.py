import multiprocessing

user = "django"
group = "django"
bind = "127.0.0.1:8080"
workers = multiprocessing.cpu_count() * 2 + 1
pidfile = '/app/run/gunicorn.pid'
errorlog = '-'
accesslog = '-'
loglevel = "debug"
max_requests = 1000
timeout = 600 * 90
reload = True
