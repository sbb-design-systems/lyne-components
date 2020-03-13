#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x build_release_urls.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

BRANCH_NAME="https://github.com/lyne-design-system/lyne-components/tree/$1"

# run build_release_urls.js with neccessary arguments
node ./ci/build_deploy_urls.js --netlifyToken=$NETLIFY_AUTH_TOKEN --netlifySiteId=$NETLIFY_SITE_ID --gitUser=lyne-design-system --gitToken=$GH_PERSONAL_TOKEN --gitMail=$GH_MAIL --branch=$BRANCH_NAME
