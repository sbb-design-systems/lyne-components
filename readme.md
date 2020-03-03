[![Build Status](https://travis-ci.org/lyne-design-system/lyne-components.svg?branch=master)](https://travis-ci.org/lyne-design-system/lyne-components) [![Greenkeeper badge](https://badges.greenkeeper.io/lyne-design-system/lyne-components.svg)](https://greenkeeper.io/)

# Todo
- Rename package name to "lyne-components"
- Currently, Travis always runs 2 release builds instead of just 1.
    - first build example: https://travis-ci.org/lyne-design-system/lyne-components/builds/657489977
    - second build example: https://travis-ci.org/lyne-design-system/lyne-components/builds/657490737

    -> the second build is skipping the deploy step, it just runs the build and test command. The Semantic-release plugin is writing the release-tag after succesfull deployment back to the repo. The second build most problably comes from there. We can get around that by using a custom commit message for semantic-release, which makes travis ignore that commit for build:
    https://medium.com/@kevinkreuzer/the-way-to-fully-automated-releases-in-open-source-projects-44c015f38fd6

- Decide for Branching-Model
- Add Merge Checks
- Greenkeeper
- Add Linter
- Check vulnerabilities / auto scanner
- Add Storybook
- Configure semantic-release to:
  - update CHANGELOG.md in git repo
  - to update version in package.json
- Remove semantic-release dependcy. It is executed via npx on travis (see travis.yml)
