#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x build_release_urls.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
# -v: verbose mode
set -ev

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  # run build_release_urls.js with neccessary arguments
  node build_release_urls.js --netlifyToken=$NETLIFY_AUTH_TOKEN --netlifySiteId=$NETLIFY_SITE_ID --gitUser=lyne-design-system --gitToken=$GH_PERSONAL_TOKEN --gitMail=$GH_MAIL

else
  echo "-->> Skipping build_release_urls.js to create DEPLOYMENTS.md"
fi
