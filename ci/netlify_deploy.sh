#!/bin/bash

# this script is used in .travis.yml

# -e: make sure command returns non-zero exit code as soon as somehting fails
# -v: verbose mode
set -ev

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  # make storybook build
  npm run build:storybook

  # install netlify-cli
  npm install netlify-cli -g

  # deploy on netlify
  netlify deploy --prod --message "::`cat .version`::" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/
else
  echo "-->> Skipping netlify depoly"
fi
