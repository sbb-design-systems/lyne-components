FROM nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/sbb-design-systems/lyne-components

COPY --chown=nginx:nginx ./dist/docs /usr/share/nginx/html
COPY ./dist/docs-nginx/default.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types
COPY --chown=nginx:nginx ./inject-versions.sh /docker-entrypoint.d/40-inject-versions.sh
RUN chmod +x /docker-entrypoint.d/40-inject-versions.sh
