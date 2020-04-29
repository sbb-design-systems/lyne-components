# Todos

- [git(hub)](#github)
- [Local dev setup / Stencil setup](#local-dev-setup--stencil-setup)
- [Storybook](#storybook)
- [CI / CD pipeline](#ci--cd-pipeline)
- [Documentation](#documentation)
- [Security](#security)


## git(hub)
- [ ] Prevent push to master
  - [ ] Re-add `Require status checks to pass before merging` to [master](https://github.com/lyne-design-system/lyne-components/settings/branch_protection_rules/15040780) which prevents also push to master
- [x] Decide for branching-model
- [x] Mono-repo vs. multi-repo
- [x] Setup Projects and Milestones
- [x] Pull Request Template & Issue template: make sure, the project lyne-components is automatically set when opening a pull request. I only know of the way to set it via url-params like this: https://github.com/lyne-design-system/lyne-components/issues/new?title=Bug+fix&projects=lyne-design-system/lyne-components/1. Probably, it might not even by possible (s. this forum thread): https://github.community/t5/How-to-use-Git-and-GitHub/Feature-Request-Allow-to-add-projects-to-the-issue-template/td-p/19605
- [x] GitHub / Repo -> Insights -> Community -> Fullfill checklist
  - [x] Add [CODE_OF_CONDUCT.md](/.github/CODE_OF_CONDUCT.md)
  - [x] Add [CONTRIBUTING.md](/.github/CONTRIBUTING.md)
  - [x] Add [SUPPORT.md](/.github/SUPPORT.md)
  - [x] Add [pull request template](/.github/pull_request_template.md)
  - [x] Add [issue](/.github/ISSUE_TEMPLATE) templates
    - [x] Add accessibility issue tpl
    - [x] Add documentation issue tpl
    - [x] Add performance issue tpl
    - [x] Add feature request issue tpl
    - [x] Add bug report issue tpl
    - [x] Add question issue tpl
  - [x] Add [SECURITY.md](/.github/SECURITY.md) policy and define process of how to deal with security issues / vulnerabilities
- [ ] The repo with the examples contains references to the lyne-test npm packages. As soon as we publish the npm package lyne-components and delete the lyne-test package, we need to update those dependencies.
- [ ] Snyk only offers 200 tests a month. Snyk runs on every pr that we make, so we might run out of tests very quickly. -> search for alternative or use paid plan
- [ ] Gibhub Workflow
  - [ ] Add Probot GitHub integration
  - [ ] Optimize Gibhub Workflow: if a user creates a pull request and assigns it to the project before the according workflow is run, the workflow is marked as failed
  - [ ] Configure actions. Greetings and Stale would make sense for us.

#### Check
✅ Nothing to check

#### Verify
- [ ] First create PR A with fix, then create PR B with fix. Merge PR B. Now Master is ahead of PR A. Check if new version is released after PR A ist merged.
- [ ] Create PRs with a fix (new version). Merge one after another, before the CI for the first merged PR is finished -> 2 new releases should be created

#### Issues
✅ Nothing to verify

## Local dev setup / Stencil setup
- [ ] Rename npm package name to ```lyne-components```
- [x] npm script ```start``` runs Stencil and Storybook in parallel. We need sequential. The problem is that ```start:stencil``` has no exit code since it is serving and watching, so the second sequential command ```start:storybook``` is not run. Quick fix is to run them parallel. Possible workaround: `"build:stencil:dev": "stencil build --ci --dev --docs", "build:dev": "npm-run-all --sequential build:stencil:dev build:storybook", "develop": "npm-run-all --sequential build:dev start"`

- [ ] npm script ```start``` runs 2 node scripts. To exit (stop the 2 servers), dev's need to press ctrl&c 2 times. Optimize it.
- [ ] Decide if we should fix dependencies/devDependencies in `package.json`. If so, which ones? Why? Probably fix to minor version? Or Major?
- [ ] ESLint: currently, we ignore ```*.spec.ts``` and ```*.e2e.ts``` files. Include them in linting and add corresponding rules
- [ ] Stencil has a set of typescript-rules. It would make sense that we adhere to these:
  - [ ] https://stenciljs.com/docs/style-guide
  - [ ] https://www.npmjs.com/package/tslint-stencil (TSLint is deprecated. We might/must write our own portation to ESLint: https://github.com/natemoo-re/tslint-stencil/issues/9)
- [ ] Add React output target https://github.com/ionic-team/stencil-ds-plugins. We need to discuss if we really want that. It means, we would have to publish a separate package on npm.
- [ ] Add Angular output target https://github.com/ionic-team/stencil-ds-plugins. Note: angular output target is hard to implement since `ValueAccessorConfig` needs to be manually generated and kept up to date during development. This is the config that duet uses: [https://gist.github.com/viljamis/4ef368862b1ac1a914ac77ddf8b0a3aa](https://gist.github.com/viljamis/4ef368862b1ac1a914ac77ddf8b0a3aa)
- [ ] alongside unit and e2e tests, we might start using muation tests
- [x] after switching from css to scss, live reload no longer works for scss changes
- [ ] optimize start script. Preffered solution: wait for the stencil node-event `build-finished`. After the event is received, run `start:storybook`. Stencil node-event `build-finished` doesn't exist yet, a pull-request at stencil is needed.

#### Check
- [ ] Stencil ESLint / TSLint in https://github.com/ionic-team/stencil-eslint

#### Verify
✅ Nothing to verify

#### Issues
- [ ] ESLint: an unused public property is not reported by eslint

## Storybook
- [ ] We currently only lint `.tsx` files. but we must also lint `.js` files like configs for Storybook
- [x] We should use [Storybook Docs](https://github.com/storybookjs/storybook/tree/next/addons/docs) instead of [Storybook Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes) because they are [deprecated](https://github.com/storybookjs/storybook#deprecated-addons)

#### Check
- [ ] Storybook [Web Components](https://github.com/storybookjs/storybook/tree/next/app/web-components) integration in next major release. Replace current with upcoming if promising
- [ ] Also have a look here https://github.com/ionic-team/stencil-sass/issues/15#issuecomment-603496922

#### Verify
✅ Nothing to verify

#### Issues
✅ No issues


## CI / CD pipeline
- [x] In Travis, build logs are cluttered. Lower log level for semantic-release/npm publish and npm install -g netlify-cli
- [ ] Different secrets and env-variables on git, Travis and netlify.
  - [x] Document exactly which key is needed for what and where to generate it
  - [ ] Before production: regenerate all keys
- [ ] For the deployments page:
  - [ ] In which timezone should we format the date?
  - [ ] The list of deployments might get large over time. Should we limit it to x releases?
- [ ] Add yml linter (for .travis.yml)
- [ ] Add build script for [thegreenwebfoundation](https://github.com/thegreenwebfoundation/co2.js):
  - [ ] Determine which of our services are green (Travis, netlifiy)
  - [ ] Calculate co2 emissions
  - [ ] Write values to md-file
- [ ] Probably we could integrate [sitespeed](https://www.sitespeed.io)
- [ ] If tests are run, a coverage report is generated in the ```coverage``` folder. Should we make it available to the public somewhere?
- [x] npm package size is huge!
- [ ] Integrate [webhint](https://webhint.io/docs/user-guide/)
- [ ] Code coverage
  - [x] Configure Code coverage for Jest
  - [ ] Code coverage report: currently, only unit-tests (```*.spec.ts```) are taken into consideration. We might eighter have a separate report for e2e-tests or merge those together.
- [ ] Assumption: we delete branches after merging. In that case, we should just write branch-names on the deployments page instead of links, since we're not sure how long those links will be valid.
- [x] When pushing to master, PREVIEWS.md is not created.
- [ ] Liniting in CI folder: we currently use plain java-script for ci-specific tasks (everything in the ci-folder):
  - Option 1: Keep JavaScript. In that case, we need to lint these files with ESLint
  - Option 2: Transform to typescript. In that case, we use Typescript ESLint to lint the files. Drawback is, that we would have to npm install typscript on the travis job in order for it to transpile the files.
- [ ] add Webhook to netlify for Git PR: if a pr is created, add a link to the deploy preview from netlify
- [ ] we have some dependencies that we always want to install in latest version, like line-design-tokens. We could add `npm up lyne-design-token` to the travis config. But it would be better if latest line-design-tokens would be installed after `npm install`. Find a way to do so.

#### Check
✅ Nothing to check

#### Verify
- [ ] For how long are deployments saved on Netlify? Forever? 30 days? 1 year?
- [x] For merge checks on Travis: make sure semantic-release and deploy does not run
- [x] After merging a PR, the script to generate the release urls might fail. Check to make sure it does not run into merge-conflicts or similar

#### Issues
✅ No issues

## Documentation
- [x] Document release process in [docs/RELEASING.md](docs/RELEASING.md) --> moved to [docs/CICD.md](docs/CICD.md) document
- [x] Modify content of sustainability-policy file to match our own vision and policies.
- [ ] The release-badge in the [README.md](./README.md) file is out of sync sometimes ...
- [x] Add documentation for [docs/CICD.md](docs/CICD.md) pipeline
- [x] Define and document terminology in [docs/TERMINOLOGY.md](docs/TERMINOLOGY.md)
- [X] Document vision in [docs/VISION.md](docs/VISION.md)
- [ ] Document roadmap in [docs/ROADMAP.md](docs/ROADMAP.md)

#### Check
✅ Nothing to check

#### Verify
✅ Nothing to verify

#### Issues
✅ No issues


## Security
- [ ] Admin permissions on repo for (certain) Lyne team members. Necessary to create security advisories and privately collaborate to fix vulnerabilities in a temporary private fork ... [see](https://help.github.com/en/github/managing-security-vulnerabilities/about-github-security-advisories)
- [ ] Setup either https://hackerone.com/lyne-design-system or https://hackerone.com/sbb-cff-ffs similar to https://hackerone.com/github ... also check https://bounty.github.com/
  - [ ] ~~Update [security issue template](.github/ISSUE_TEMPLATE/00-security-issue.md) if needed~~
  - [ ] Update [SECURITY.md](.github/SECURITY.md) if needed

#### Check
✅ Nothing to check

#### Verify
✅ Nothing to verify

#### Issues
✅ No issues
