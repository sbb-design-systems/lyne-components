FROM ghcr.io/nginxinc/nginx-unprivileged:stable

COPY ./tools/visual-regression-testing/baseline.nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/screenshots /usr/share/nginx/html

USER root
RUN find /usr/share/nginx/html/*/ -type f ! -iname "*.png" -delete
RUN find /usr/share/nginx/html/*/ -type d -name failed -prune -exec rm -rf {} \;
USER $UID
