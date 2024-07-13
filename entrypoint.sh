#!/usr/bin/env bash
set -e
NGINX_AUTH_BASIC=${NGINX_AUTH_BASIC:-"on"}

if [ ! -d /etc/nginx ]; then
    # on local development we aren't using nginx
    echo "nginx not installed"
else
    # subtitute using sed
    sed -i.bak -e "s/\${NGINX_AUTH_BASIC}/${NGINX_AUTH_BASIC}/g" /app/config/nginx/sites-available/app.vhost
    # move the actual config
    # then symlink the main config
    if [ -f /app/config/nginx/nginx.conf ]; then
        ln -fs /app/config/nginx/nginx.conf /etc/nginx/nginx.conf
    fi
    # run bot blocker
    # /usr/local/sbin/setup-ngxblocker -x -v /app/config/nginx/sites-available
fi


# Use the correct environment file
if [ -z ${ENVIRONMENT+x} ]; then
    echo "ENVIRONMENT not set"

    if [ -z ${IGNORE_ENVIRONMENT_FAIL+x} ]; then # Start should fail unless IGNORE_ENVIRONMENT_FAIL is set
        exit 2;
    fi

else
    if [ ! -f /.env/$ENVIRONMENT.env ]; then
        ln -fs /.env/local.env /envfile
    else
        ln -fs /.env/$ENVIRONMENT.env /envfile
    fi

    if [ -z ${ENVIRONMENT_UNENCRYPTED+x} ]; then # Decrypt environment file unless $ENVIRONMENT_UNENCRYPTED is set
      head -1 /envfile | grep -q \$ANSIBLE_VAULT && ansible-vault decrypt /envfile --vault-password-file=/app/scripts/echo_ansible_vault_pass
    fi

    set -a
      source /envfile
    set +a

    if [ ! -f /app/config/supervisor/$ENVIRONMENT.conf ]; then
        ln -fs /app/config/supervisor/production.conf /etc/supervisor/conf.d/supervisord.conf
    else
        ln -fs /app/config/supervisor/$ENVIRONMENT.conf /etc/supervisor/conf.d/supervisord.conf
    fi
fi

#python source/manage.py collectstatic --noinput
# wrong path, the docker-compose.yml set the workdir to /app/source
 python /app/source/manage.py collectstatic --noinput

####### Set /etc/timezone
if [ -z ${TIMEZONE+x} ]; then
    echo "TIMEZONE not set... Using America/New_York";
    TIMEZONE="America/New_York"
fi
ln -sf "/usr/share/zoneinfo/$TIMEZONE" /etc/localtime

####### Place /etc/crontab
if [ -f "/app/config/crontab" ]; then
    chown root:root /app/config/crontab
    chmod 600 /app/config/crontab
    cp /app/config/crontab /var/spool/cron/crontabs/root
    /etc/init.d/cron start
else
    echo "config/crontab does not exist"
fi


exec "$@"
