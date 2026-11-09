FROM nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/sbb-design-systems/lyne-components

COPY ./dist/docs /usr/share/nginx/html
COPY ./.github/docs.js /etc/nginx
COPY ./.github/default.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types \
    && sed -i 's#events#load_module modules/ngx_http_js_module.so;\nevents#' /etc/nginx/nginx.conf \
    && sed -i 's#events#env LEGACY_VERSIONS;\nevents#' /etc/nginx/nginx.conf

