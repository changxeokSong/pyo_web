#!/bin/bash
set -e

echo "🛑 Stopping containers..."
docker-compose down

echo "🧹 Cleaning up old certificates..."
sudo rm -rf letsencrypt
sudo rm -rf certbot

echo "🚀 Starting Nginx (This will generate a dummy certificate)..."
docker-compose up -d nginx
sleep 5

echo "🗑️ Removing dummy certificate from disk (Nginx holds it in memory)..."
# This is the magic step: Nginx keeps running with the dummy cert loaded,
# but we clear the path so Certbot can write the REAL certs there without conflict.
sudo rm -rf letsencrypt/live/ymtech.kr
sudo rm -rf letsencrypt/archive/ymtech.kr
sudo rm -rf letsencrypt/renewal/ymtech.kr.conf

echo "🔒 Requesting real Let's Encrypt certificate..."
# Override entrypoint because docker-compose.yml uses /bin/sh
docker-compose run --rm --entrypoint certbot certbot certonly --webroot \
  -w /var/www/certbot \
  -d ymtech.kr -d www.ymtech.kr \
  --email thdckdtjr8@gmail.com \
  --agree-tos \
  --non-interactive \
  --force-renewal

echo "🔄 Reloading Nginx to apply the new certificate..."
docker-compose exec nginx nginx -s reload

echo "✅ Bringing up all other services..."
docker-compose up -d

echo "🎉 Done! Please refresh your browser (you might need to clear cache)."
