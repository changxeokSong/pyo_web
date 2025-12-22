#!/bin/sh
set -e

DOMAIN="ymtech.kr"
LIVE_PATH="/etc/letsencrypt/live/${DOMAIN}"

if [ ! -f "${LIVE_PATH}/fullchain.pem" ] || [ ! -f "${LIVE_PATH}/privkey.pem" ]; then
  mkdir -p "${LIVE_PATH}"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "${LIVE_PATH}/privkey.pem" \
    -out "${LIVE_PATH}/fullchain.pem" \
    -subj "/CN=${DOMAIN}" >/dev/null 2>&1
fi

exec nginx -g 'daemon off;'
