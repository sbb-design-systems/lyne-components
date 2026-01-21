FROM nginxinc/nginx-unprivileged:stable

LABEL org.opencontainers.image.source=https://github.com/sbb-design-systems/lyne-components

# Copy nginx configuration
COPY ./dist/storybook-nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy docs
COPY ./dist/storybook /usr/share/nginx/html

# Add support for .mjs extension
RUN sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types
