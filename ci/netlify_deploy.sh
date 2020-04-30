#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x netlify_deploy.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  VERSION="$(cat .version)"

  # Make Storybook build
  STORYBOOK_COMPONENTS_VERSION=$VERSION npm run build:storybook

  # Send storybook to chromatic
  # npm run chromatic

  # Deploy Storybook on Netlify
  netlify deploy --prod --message "::$VERSION::" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/

else
  echo "-->> Skipping netlify depoly"
fi
