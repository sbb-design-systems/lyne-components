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

  echo "-->> trigger build on lyne-documentation"

  # Send request to travis api to trigger build on lyne-documentation
  curl \
    -v \
    -X POST \
    -H "User-Agent: Github lyne-components" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: token $TRAVIS_TOKEN" \
    -H "Travis-API-Version: 3" \
    -d "{'request':{'message':'Build triggered by lyne-components','branch':'master'}}" "https://api.travis-ci.org/repo/lyne-design-system%2Flyne-documentation/requests"

else
  echo "-->> Skip trigger build of lyne-documentation"
fi
