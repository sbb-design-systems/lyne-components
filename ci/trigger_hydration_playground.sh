#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x trigger_hydration_playground.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

# version file name written by .releaserc
VERSION_FILE=.version

if [ -f "$VERSION_FILE" ];
then

  VERSION="$(cat .version)"

  # Deploy Storybook on Netlify
  node ./ci/trigger_hydration_playground.js --travisToken=$TRAVIS_TOKEN

else
  echo "-->> no new release -> skip triggering build on lyne-hydration-playground"
fi
