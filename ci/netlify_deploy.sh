#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x netlify_deploy.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
# -v: verbose mode
set -ev

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  VERSION="$(cat .version)"

  # make storybook build
  STORYBOOK_COMPONENTS_VERSION=$VERSION npm run build:storybook

  # install netlify-cli
  npm install netlify-cli -g

  # deploy on netlify
  netlify deploy --prod --message "::$VERSION::" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/
else
  echo "-->> Skipping netlify depoly"
fi
