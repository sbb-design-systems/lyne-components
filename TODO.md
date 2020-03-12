## Todo
- in travis, build logs are cluttered. Lower log level for semantic-release/npm publish and npm install -g netlify-cli
- Rename package name to "lyne-components"
- Decide for Branching-Model
- Add Merge Checks
- Repo -> Insights -> Community -> Fullfill checklist
- Prevent push to master
- npm script ```start``` runs stencil and storybook in parallel. We need sequential. Problem is that ```start:stencil``` has no exit code since it is serving and watching, so the second sequential command ```start:storybook``` is not run. Quick fix is to run them parallel.
- npm script ```start``` runs 2 node scripts. To exit (stop the 2 servers), dev's need to press ctrl&c 2 times. Optimize it.
- Different secrets and env-variables on git, travis and netlify.
  - Document exactly which key is needed for what and where to generate it
  - Before production: regenerate all keys
- for DEPLOYMENTS.md: in which timezone should we format the date?
- DEPLOYMENTS.md might get large over time. Should we limit it to x releases?
- in Deployments.md: if a dev is changing the content and pushing to the repo, might we run into merge-conflicts? if yes, how could build_release_urls.js handle these?
- decide if we should fix dependencies/devDependencies in package json. If so, which ones? Why? Probably fix to minor version? Or Major?
- Add yml linter (for .travis.yml)
- Modify content of sustainability-policy file to match our own vision and policies.
- The release-badge in the readme.md file is out of sync sometimes...
- ESLint: currently, we ignore ```*.spec.ts``` and ```*.e2e.ts``` files. Include them in linting and add corresponding rules
- Stencil has a set of typescript-rules. It would make sense that we adhere to these:
  - https://stenciljs.com/docs/style-guide
  - https://www.npmjs.com/package/tslint-stencil (TSLint is deprecated. We might/must write our own portation to ESLint: https://github.com/natemoo-re/tslint-stencil/issues/9)
- add build script for https://github.com/thegreenwebfoundation/co2.js:
  - determine which of our services are green (travis, netlifiy)
  - calculate co2 emissions
  - write values to md-file
- Probably we could integrate https://www.sitespeed.io/?
- We currently only lint tsx files. but we must also lint .js files like configs for storybook
- If tests are run, a coverage report is generated in the ```coverage``` folder. Should we make it available to the public somewhere?
- Config codecoverage for Jest
- Integrate  https://webhint.io/docs/user-guide/
- Code Coverage Report: currently, only unit-tests (```*.spec.ts```) are taken into consideration. We might eighter have a separate report for e2e-tests or merge those together.

## Issues
- If you commit a fix and the merge the latest master before pushing, semantic-release won't do a new release: 'The local branch master is behind the remote one, therefore a new version won't be published.' -> https://travis-ci.org/lyne-design-system/lyne-components/jobs/658782240
- ESLint: an unused public property is not reported by eslint

## Verify
- If a travis release job is running, semantic-release did not run yet, and a new change with a breaking change is pushed to master, what happens? Travis should not make a new release, but make another build afterwards with a new release containing both changes
- For how long are deployments saved on netlify? Forever? 30 days? 1 year?
- For merge checks on travis: make sure semantic-release and deploy does not run
