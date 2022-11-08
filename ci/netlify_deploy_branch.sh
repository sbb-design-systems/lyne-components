#!/bin/bash

# this script is used in GitHub workflows

# this script is being made executable with
# chmod ugo+x netlify_deploy_branch.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as something fails
set -e

# Deploy Storybook on Netlify
yarn netlify deploy --message "++$1++" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/
