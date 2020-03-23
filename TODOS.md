# Todos

## git
- [x] Prevent push to master
- [ ] Decide for branching-model
- [ ] Mono-repo vs. multi-repo

#### Check
✅ Nothing to check

#### Verify
✅ Nothing to verify

#### Issues
- [ ] If you commit a fix and the merge the latest master before pushing, semantic-release won't do a new release: 'The local branch master is behind the remote one, therefore a new version won't be published.' --> https://travis-ci.org/lyne-design-system/lyne-components/jobs/658782240

## Local dev setup / Stencil setup
- [ ] Rename npm package name to ```lyne-components```
- [ ] npm script ```start``` runs Stencil and Storybook in parallel. We need sequential. The problem is that ```start:stencil``` has no exit code since it is serving and watching, so the second sequential command ```start:storybook``` is not run. Quick fix is to run them parallel.
- [ ] npm script ```start``` runs 2 node scripts. To exit (stop the 2 servers), dev's need to press ctrl&c 2 times. Optimize it.
- [ ] Decide if we should fix dependencies/devDependencies in `package.json`. If so, which ones? Why? Probably fix to minor version? Or Major?
- [ ] ESLint: currently, we ignore ```*.spec.ts``` and ```*.e2e.ts``` files. Include them in linting and add corresponding rules
- [ ] Stencil has a set of typescript-rules. It would make sense that we adhere to these:
  - [ ] https://stenciljs.com/docs/style-guide
  - [ ] https://www.npmjs.com/package/tslint-stencil (TSLint is deprecated. We might/must write our own portation to ESLint: https://github.com/natemoo-re/tslint-stencil/issues/9)

#### Check
- [ ] Stencil ESLint / TSLint in https://github.com/ionic-team/stencil-eslint

#### Verify
✅ Nothing to verify

#### Issues
- [ ] ESLint: an unused public property is not reported by eslint

## Storybook
- [ ] We currently only lint `.tsx` files. but we must also lint `.js` files like configs for Storybook
- [ ] We should use [Storybook Docs](https://github.com/storybookjs/storybook/tree/next/addons/docs) instead of [Storybook Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes) because they are [deprecated](https://github.com/storybookjs/storybook#deprecated-addons)

#### Check
- [ ] Storybook [Web Components](https://github.com/storybookjs/storybook/tree/next/app/web-components) integration in next major release. Replace current with upcoming if promising 

#### Verify
✅ Nothing to verify

#### Issues
✅ No issues


## CI / CD pipeline
- [ ] In Travis, build logs are cluttered. Lower log level for semantic-release/npm publish and npm install -g netlify-cli
- [ ] Different secrets and env-variables on git, Travis and netlify.
  - [ ] Document exactly which key is needed for what and where to generate it
  - [ ] Before production: regenerate all keys
- [ ] For [DEPLOYMENTS.md](./DEPLOYMENTS.md) or [RELEASES.md](./RELEASES.md): 
  - [ ] In which timezone should we format the date?
  - [ ] Files might get large over time. Should we limit it to x releases?
- [ ] Add yml linter (for .travis.yml)
- [ ] Add build script for [thegreenwebfoundation](https://github.com/thegreenwebfoundation/co2.js):
  - [ ] Determine which of our services are green (Travis, netlifiy)
  - [ ] Calculate co2 emissions
  - [ ] Write values to md-file
- [ ] Probably we could integrate [sitespeed](https://www.sitespeed.io)
- [ ] If tests are run, a coverage report is generated in the ```coverage``` folder. Should we make it available to the public somewhere?
- [ ] npm package size is huge!
- [ ] Integrate [webhint](https://webhint.io/docs/user-guide/)
- [ ] codecoverage
  - [ ] Configure codecoverage for Jest
  - [ ] codecoverage report: currently, only unit-tests (```*.spec.ts```) are taken into consideration. We might eighter have a separate report for e2e-tests or merge those together.
- [ ] Assumption: we delete branches after merging. In that case, we should just write branch-names in BRANCHES.md instead of links, since we're not sure how long those links will be valid.
- [ ] When pushing to master, PREVIEWS.md is not created.

#### Check
✅ Nothing to check

#### Verify
- [ ] If a Travis release job is running, semantic-release did not run yet, and a new change with a breaking change is pushed to master, what happens? Travis should not make a new release, but make another build afterwards with a new release containing both changes
- [ ] For how long are deployments saved on netlify? Forever? 30 days? 1 year?
- [ ] For merge checks on Travis: make sure semantic-release and deploy does not run
- [ ] After merging a PR, the script to generate the release urls might file. Check to make sure it does not run into merge-conflicts or similar

#### Issues
✅ No issues

## Documentation
- [ ] Repo -> Insights -> Community -> Fullfill checklist
- [ ] Document realeasing process in [docs/RELEASING.md](docs/RELEASING.md)
- [ ] Modify content of sustainability-policy file to match our own vision and policies.
- [ ] The release-badge in the [README.md](./README.md) file is out of sync sometimes ...
- [ ] Add documentation for CI / CD pipeline
- [ ] Document roadmap in [docs/ROADMAP.md](docs/ROADMAP.md)

#### Check
✅ Nothing to check

#### Verify
✅ Nothing to verify

#### Issues
✅ No issues