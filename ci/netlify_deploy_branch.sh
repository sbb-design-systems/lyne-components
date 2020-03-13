#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x netlify_deploy_branch.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e


# install netlify-cli. We send stdout/stderr to /dev/null since we're not
# interested in the output from netlify-cli
npm install netlify-cli -g > "/dev/null" 2>&1

# deploy on netlify
netlify deploy --message "++$1++" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/
