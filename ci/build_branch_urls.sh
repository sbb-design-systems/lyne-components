#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x build_release_urls.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

# run build_release_urls.js with neccessary arguments
node ./ci/build_deploy_urls.js --netlifyToken=$NETLIFY_AUTH_TOKEN --netlifySiteId=$NETLIFY_SITE_ID --gitUser=lyne-design-system --gitToken=$GH_PERSONAL_TOKEN --gitMail=$GH_MAIL --branch=$1 --prod=false
