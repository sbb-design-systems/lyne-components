FROM nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/sbb-design-systems/lyne-components

COPY ./dist/storybook /usr/share/nginx/html
COPY ./dist/storybook/default.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types
