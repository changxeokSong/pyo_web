FROM nginx:alpine

RUN apk add --no-cache openssl

COPY start.sh /etc/nginx/start.sh
RUN chmod +x /etc/nginx/start.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/bin/sh", "/etc/nginx/start.sh"]
