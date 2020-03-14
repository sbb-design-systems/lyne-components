#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x build_release_urls.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  # prepare git
  node ./ci/prepare_git.js --gitUser=lyne-design-system --gitToken=$GH_PERSONAL_TOKEN --gitMail=$GH_MAIL --prod=true

  # prcoess deployments and write to json file
  node ./ci/netlify_deployments.js --netlifyToken=$NETLIFY_AUTH_TOKEN --netlifySiteId=$NETLIFY_SITE_ID

  # run build_release_urls.js with neccessary arguments
  node ./ci/build_deploy_urls.js --gitUser=lyne-design-system --gitToken=$GH_PERSONAL_TOKEN --gitMail=$GH_MAIL --prod=true

  # run build_release_urls.js with neccessary arguments
  node ./ci/build_deploy_urls.js --gitUser=lyne-design-system --gitToken=$GH_PERSONAL_TOKEN --gitMail=$GH_MAIL --prod=false


else
  echo "-->> Skipping build_release_urls.js to create DEPLOYMENTS.md"
fi
