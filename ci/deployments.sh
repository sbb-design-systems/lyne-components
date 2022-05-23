#!/bin/bash

# this script is used in GitHub workflows

# this script is being made executable with
# chmod ugo+x netlify_deploy_branch.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

DEPLOYMENTS_PAGE_DIR=NETLIFY_DEPLOYMENTS

# build the deployments json
node ./ci/deployments.js --netlifyToken=$NETLIFY_AUTH_TOKEN --netlifySiteId=$NETLIFY_SITE_ID --deploymentsDir=$DEPLOYMENTS_PAGE_DIR

# deploy deployments json
netlify deploy --prod --site $NETLIFY_SITE_ID_DEPLOYMENTS --auth $NETLIFY_AUTH_TOKEN --dir ./$DEPLOYMENTS_PAGE_DIR/
