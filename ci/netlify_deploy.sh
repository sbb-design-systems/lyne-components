#!/bin/bash

# this script is used in GitHub workflow

# this script is being made executable with
# chmod ugo+x netlify_deploy.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as something fails
set -e

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  VERSION="$(cat .version)"

  # Deploy Storybook on Netlify
  yarn netlify deploy --prod --message "::$VERSION::" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/

else
  echo "-->> Skipping netlify depoly"
fi
