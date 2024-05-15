FROM ghcr.io/nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/lyne-design-system/lyne-components

# This is currently the same config file as for baseline. Separate into separate configs, if this changes.
COPY ./tools/visual-regression-testing/baseline.nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/visual-regression-app /usr/share/nginx/html

COPY --chmod=555 ./tools/visual-regression-testing/etag-map-generation.sh /usr/share/nginx/etag-map-generation.sh

RUN /usr/share/nginx/etag-map-generation.sh > /etc/nginx/conf.d/1etags.conf
