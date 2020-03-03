[![Build Status](https://travis-ci.org/lyne-design-system/lyne-components.svg?branch=master)](https://travis-ci.org/lyne-design-system/lyne-components) [![Greenkeeper badge](https://badges.greenkeeper.io/lyne-design-system/lyne-components.svg)](https://greenkeeper.io/)

# Todo
- Rename package name to "lyne-components"
- Currently, Travis always runs 2 release builds instead of just 1.
    - first build example: https://travis-ci.org/lyne-design-system/lyne-components/builds/657489977
    - second build example: https://travis-ci.org/lyne-design-system/lyne-components/builds/657490737

    -> the second build is skipping the deploy step, it just runs the build and test command. The Semantic-release plugin is writing the release-tag after succesfull deployment back to the repo. The second build most problably comes from there.
- Decide for Branching-Model
- Add Merge Checks
- Greenkeeper
- Add Linter
- Check vulnerabilities / auto scanner
- Add Storybook
