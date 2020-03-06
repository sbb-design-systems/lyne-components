#!/bin/bash
set -ev
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ]; then
  npm run build:storybook && npm install netlify-cli -g &&netlify deploy --prod --message "::`cat .version`::" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/
fi
