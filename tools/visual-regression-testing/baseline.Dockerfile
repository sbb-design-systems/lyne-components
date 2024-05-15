FROM ghcr.io/nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/lyne-design-system/lyne-components

# Copy screenshots
COPY ./dist/screenshots/Chromium/baseline/ /usr/share/nginx/html/Chromium/baseline/
COPY ./dist/screenshots/Firefox/baseline/ /usr/share/nginx/html/Firefox/baseline/
COPY ./dist/screenshots/Webkit/baseline/ /usr/share/nginx/html/Webkit/baseline/

COPY ./tools/visual-regression-testing/baseline.nginx.conf /etc/nginx/conf.d/default.conf
COPY --chmod=555 ./tools/visual-regression-testing/etag-map-generation.sh /usr/share/nginx/etag-map-generation.sh

RUN /usr/share/nginx/etag-map-generation.sh > /etc/nginx/conf.d/1etags.conf
