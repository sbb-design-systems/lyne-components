FROM ghcr.io/nginxinc/nginx-unprivileged:stable

COPY ./tools/visual-regression-testing/baseline.nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/screenshots /usr/share/nginx/html

USER root
# We calculate the sha1 hashes of the png files in order to use it as etag values.
# This allows us to use HTTP caching mechanisms, which should reduce network traffic
# for the baseline comparison.
RUN cd /usr/share/nginx/html && \
  find ./*/ -type f ! -iname "*.png" -delete && \
  find ./*/ -type d -name failed -prune -exec rm -rf {} \; && \
  find ./*/ -type d -name .cache -prune -exec rm -rf {} \; && \
  echo 'map_hash_bucket_size 16384;' > /etc/nginx/conf.d/1etags.conf && \
  echo 'map $uri $pngetag {' >> /etc/nginx/conf.d/1etags.conf && \
  find . -type f -name '*.png' -exec bash -c 'echo "  \"${1:1}\" $(sha1sum $1 | cut -d " " -f 1);"' _ {} \; >> /etc/nginx/conf.d/1etags.conf && \
  echo '}' >> /etc/nginx/conf.d/1etags.conf
USER $UID
