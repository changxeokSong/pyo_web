#!/bin/bash

# 1. Create necessary directories for Certbot
echo "Creating directories..."
mkdir -p letsencrypt certbot

# 2. Issue the certificate using the certbot container
echo "Requesting certificate for ymtech.kr and www.ymtech.kr..."
docker-compose run --rm certbot certonly --webroot \
  -w /var/www/certbot \
  -d ymtech.kr -d www.ymtech.kr \
  --email thdckdtjr8@gmail.com \
  --agree-tos \
  --non-interactive \
  --force-renewal

# 3. Reload Nginx to apply the new certificate
echo "Reloading Nginx..."
docker-compose exec nginx nginx -s reload

echo "Done! HTTPS should now be valid."
