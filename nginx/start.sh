#!/bin/sh
set -e

DOMAIN="ymtech.kr"
LIVE_PATH="/etc/letsencrypt/live/${DOMAIN}"

# 1. Check for certificate. If missing, generate a dummy self-signed one so Nginx can start.
if [ ! -f "${LIVE_PATH}/fullchain.pem" ] || [ ! -f "${LIVE_PATH}/privkey.pem" ]; then
  echo "Certificate not found. Generating self-signed certificate for initialization..."
  mkdir -p "${LIVE_PATH}"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "${LIVE_PATH}/privkey.pem" \
    -out "${LIVE_PATH}/fullchain.pem" \
    -subj "/CN=${DOMAIN}" >/dev/null 2>&1
fi

# 2. Start Nginx in the background
echo "Starting Nginx..."
nginx -g 'daemon off;' &
NGINX_PID=$!

# 3. Background watcher for reload signal
# Checks for the presence of 'reload_nginx' file created by Certbot
(
  while kill -0 $NGINX_PID 2>/dev/null; do
    if [ -f /var/www/certbot/reload_nginx ]; then
        echo "Reload signal detected. Reloading Nginx configuration..."
        nginx -s reload
        rm -f /var/www/certbot/reload_nginx
    fi
    sleep 5
  done
) &

# 4. Wait for the Nginx process (keeps container running)
wait $NGINX_PID
