FROM ghcr.io/nginxinc/nginx-unprivileged:stable

# Copy nginx configuration
COPY ./.github/default.conf /etc/nginx/conf.d/default.conf

# Copy showcase
COPY ./dist/storybook /usr/share/nginx/html

# Add support for .mjs extension
RUN sed -i 's#application/javascript                           js;#application/javascript                           js mjs;#' /etc/nginx/mime.types
