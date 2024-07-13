FROM node:12.16-buster-slim as react_builder

COPY source /source

RUN set -ex; \
  apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests \
    build-essential \
    gcc \
    python \
    python-dev
WORKDIR /source
RUN npm install \
  && npm run build-production


# Docker image for application with Ubuntu 18.04 / python 3.6
from python:3.7-buster as Python

# E.g. no interactive prompt for tzdata install
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get -y install tzdata ntp libjpeg62 libjpeg-dev libpq-dev libfreetype6-dev zlib1g-dev postgresql-client-11 gettext gdal-bin libmemcached11 libmemcachedutil2 libmemcached-dev

# Set system time to EST
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Link these image libraries so that python packages can use them for installation
# RUN ln -s /usr/lib/x86_64-linux-gnu/libfreetype.so /usr/lib/
# RUN ln -s /usr/lib/x86_64-linux-gnu/libz.so /usr/lib/
# RUN ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib/

RUN mkdir /app

# Install pip requirements
ADD requirements.txt requirements.txt
RUN pip install --default-timeout=100 -r requirements.txt

# python 3.7, nginx, supervisor
FROM blenderbox/python-base:3.7-slim-buster
LABEL maintainer <syaiful@blenderbox.com>

EXPOSE 8000/tcp

COPY --from=Python /root/.cache /root/.cache
COPY --from=Python requirements.txt .

RUN set -ex; \
    apt-get update \
    && apt-get install -y --no-install-recommends --no-install-suggests \
      cron \
      gosu \
      gdal-bin \
      libncurses5 \
      libmemcached11 \
      memcached \
      libpq5 \
      libgeos-3.7.1 \
      rsyslog \
      nano \
    \
    && pip install -r requirements.txt \
    && pip install ansible==4.7.0 \ 
	&& pip install ansible-vault==2.1.0 \
    && rm -rf /root/.cache \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app && mkdir /app/run && mkdir /.env/ && mkdir -p /app/build

COPY source/ /app/source/
COPY .env/ /.env/
COPY config/ /app/config/
COPY scripts/ /app/scripts/
COPY public/ /app/public/

ARG DJANGO_MODE=build
ENV DJANGO_MODE="${DJANGO_MODE}"

RUN set -ex; \
  curl -L --show-error --retry 5 -o /usr/local/share/ca-certificates/rds-ca-2019-root.pem https://s3.amazonaws.com/rds-downloads/rds-ca-2019-root.pem \
  && chown django: /usr/local/share/ca-certificates/rds-ca-2019-root.pem \
  && mkdir -p /app/data/ \
  && chown -R django: /app/source \
  && chown -R django: /app/run \
  && gosu django python /app/manage.py collectstatic --noinput \
  #&& gosu django python /app/manage.py compress --force \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log \
  && rm /etc/nginx/conf.d/default.conf \
  && rm -f /app/build/index.html || true \
  && rm -rf /app/build/static


# Copy the entrypoint that will generate Nginx additional configs
COPY ./entrypoint.sh /entrypoint.sh
COPY ./.env /.env/
RUN chmod +x /entrypoint.sh && \
echo 'if [[ -f "/envfile" ]]; then\n\
  set -a\n\
  source /envfile\n\
  set +a\n\
fi\n' >> ~/.bashrc


RUN rm /etc/nginx/conf.d/default*
RUN useradd -ms /bin/bash sir_app_user

RUN apt-get install openssl ca-certificates
RUN rm /usr/share/ca-certificates/mozilla/DST_Root_CA_X3.crt
RUN update-ca-certificates

RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

COPY --from=react_builder /public/react /app/public/react

ENTRYPOINT ["/usr/local/bin/tini", "-g", "--", "bash", "/entrypoint.sh"]

CMD ["/usr/bin/supervisord"]

