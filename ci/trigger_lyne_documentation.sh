#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x netlify_deploy.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

echo "-->> trigger build on lyne-documentation"

# Send request to travis api to trigger build on lyne-documentation
body='{
  "request": {
    "branch":"master",
    "message": "triggered by lyne-components change"
  }
}'

curl -s -X POST \
   -H "Content-Type: application/json" \
   -H "Accept: application/json" \
   -H "Travis-API-Version: 3" \
   -H "Authorization: token $TRAVIS_TOKEN" \
   -d "$body" \
   https://api.travis-ci.org/repo/lyne-design-system%2Flyne-documentation/requests
