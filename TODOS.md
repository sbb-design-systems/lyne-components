# Todos

- [git(hub)](#github)
- [Local dev setup](#local-dev-setup)
- [Storybook](#storybook)
- [CI / CD pipeline](#ci--cd-pipeline)
- [Documentation](#documentation)
- [Security](#security)

## git(hub)

- [ ] Prevent push to main
  - [ ] Re-add `Require status checks to pass before merging` to [main](https://github.com/lyne-design-system/lyne-components/settings/branch_protection_rules/15040780) which prevents also push to main
- [ ] The repo with the examples contains references to the lyne-test npm packages. As soon as we publish the npm package lyne-components and delete the lyne-test package, we need to update those dependencies.
- [x] Snyk only offers 200 tests a month. Snyk runs on every pr that we make, so we might run out of tests very quickly. -> search for alternative or use paid plan. Possible alternatives:
  - Renovate: only updates, no security pr's. obviously free
  - depfu: updates and security pr's, free for open source
  - Dependabot: updates and security pr's. free
- [ ] Gibhub Workflow
  - [ ] Add Probot GitHub integration
  - [ ] Optimize Gibhub Workflow: if a user creates a pull request and assigns it to the project before the according workflow is run, the workflow is marked as failed
  - [ ] Configure actions. Greetings and Stale would make sense for us.
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
  - [ ] Dependabot: check if dependabot could also make pr's for major versions

#### Check

- [ ] Check GitHub's integrated _Code scanning_ https://github.com/features/security
  - [x] Apply for limited public beta program https://github.com/features/security/advanced-security/signup?account=lyne-design-system

#### Verify

- [x] First create PR A with fix, then create PR B with fix. Merge PR B. Now Main is ahead of PR A. Check if new version is released after PR A ist merged.
- [x] Create PRs with a fix (new version). Merge one after another, before the CI for the first merged PR is finished -> 2 new releases should be created
- [ ] Releasing of merged pr's which are behind and ahead of main. If main is ahead of a pr at merge time, semantic-release will be skipped. A potential release will be made, as soon as a new pr is merged on a up-to-date main basis. No problems so far, behavior is ok. Is this the behavior we want? Example:
  - This build should have triggered a release. But since main was ahead of the merged branch, release was skipped: https://travis-ci.org/github/lyne-design-system/lyne-components/builds/689137974
  - The release was triggered later on, as soon as a branch got merged which itself has a merged state from the main, including the changes from the PR before: https://travis-ci.org/github/lyne-design-system/lyne-components/builds/689139711

#### Issues

✅ Nothing to verify

## Local dev setup

- [ ] Rename npm package name to `lyne-components`
- [ ] For storybook v6, `addon-docs` had to be removed since it is deprecated. Switch to mdx docs.

- [ ] Decide if we should fix dependencies/devDependencies in `package.json` to patch versions only (~1.0.0) or minor versions (^1.0.0) or to exact version (1.0.0). If so, which ones? Why? Probably fix to minor version? Or Major?
- [x] ESLint: currently, we ignore `*.spec.ts` and `*.e2e.ts` files. Include them in linting and add corresponding rules
- [ ] Add React output target https://lit.dev/docs/frameworks/react/. We need to discuss if we really want that. It means, we would have to publish a separate package on npm.
- [ ] Verify Angular integration
- [ ] alongside unit and e2e tests, we might start using muation tests. We could possibly use https://stryker-mutator.io/ for that
- [x] Typescript: string literal types -> documentation. Example: in lyne-heading, we limit the values for the level property with string literal types. Find away to automatically include those type definitions in documenation.
- [ ] Local npm dependencies vs. dependencies installed by travis: a developer installs a dependency, version 1.0.0. A month later, that dependency got several updates and is now on version 1.2.5. In a build, travis will install 1.2.5, while the developers are still on older version, as long as they don't run `npm up` or similar. We need to find a way to force developers to update dependencies, or make it easy for them.
- [ ] To be consequent, we should write our stories in typescript as well
- [ ] Maybe use scss/css linter
- [ ] Decide if we use css or scss
- [x] npm script `start` runs 2 node scripts. To exit (stop the 2 servers), dev's need to press ctrl&c 2 times. Optimize it.
- [x] after switching from css to scss, live reload no longer works for scss changes

#### Check

✅ Nothing to check

#### Verify

✅ Nothing to verify

#### Issues

- [ ] ESLint: an unused public property is not reported by eslint

## Storybook

- [ ] We currently only lint `.tsx` files. but we must also lint `.js` files like configs for Storybook
- [ ] Use gzip and brotli compression for dist files
- [x] We should use [Storybook Docs](https://github.com/storybookjs/storybook/tree/next/addons/docs) instead of [Storybook Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes) because they are [deprecated](https://github.com/storybookjs/storybook#deprecated-addons)

#### Check

- [x] Storybook [Web Components](https://github.com/storybookjs/storybook/tree/next/app/web-components) integration in next major release. Replace current with upcoming if promising

#### Verify

✅ Nothing to verify

#### Issues

✅ No issues

## CI / CD pipeline

- [ ] `package-lock.json` mismatch. We need to find a way to handle it consistently. Preferred solution: currently, `semnatic-release` is responsible for pushing changes in `package.json` and `package-lock.json` back to the repo. We remove that step from `semantic-release` an make it is own step, which will always be run. To clarify on the issue, imagine the following to situations:
  - situation a: we push a commit which will produce a new version. At the same time, a certain dependency got an update from 1.2.0 to 1.2.5. Travis will do a fresh `npm install`, and since `sematic-release` will update the `package-lock.json` (write new version number), it will also have an update for the new version of the dependency. It will then push the new `package-lock.json` back to the repo.
  - situation b: we push a commit which will NOT produce a new version. At the same time, a certain dependency got an update from 1.2.0 to 1.2.5. Travis will do a fresh `npm install`, and have a new version for the dependency in `package-lock.json`. But since `semantic-release` is not triggered, the new `package-lock.json` won't be pushed back to the repo.
- [ ] Different secrets and env-variables on git, Travis and netlify.
  - [x] Document exactly which key is needed for what and where to generate it
  - [ ] Before production: regenerate all keys
- [ ] For the deployments page:
  - [ ] In which timezone should we format the date?
  - [ ] The list of deployments might get large over time. Should we limit it to x releases?
- [x] Add yml linter (for .travis.yml)
- [ ] Add build script for [thegreenwebfoundation](https://github.com/thegreenwebfoundation/co2.js):
  - [ ] Determine which of our services are green (Travis, netlifiy)
  - [ ] Calculate co2 emissions
  - [ ] Write values to md-file
- [ ] Probably we could integrate [sitespeed](https://www.sitespeed.io)
- [ ] Integrate [webhint](https://webhint.io/docs/user-guide/)
- [ ] Code coverage
  - [x] Configure Code coverage for Jest
  - [ ] Code coverage report: currently, only unit-tests (`*.spec.ts`) are taken into consideration. We might eighter have a separate report for e2e-tests or merge those together.
- [x] Linting in CI folder: we currently use plain java-script for ci-specific tasks (everything in the ci-folder):
  - Option 1: Keep JavaScript. In that case, we need to lint these files with ESLint
  - Option 2: Transform to typescript. In that case, we use Typescript ESLint to lint the files. Drawback is, that we would have to npm install TypeScript on the travis job in order for it to transpile the files.
- [x] add Webhook to netlify for Git PR: if a pr is created, add a link to the deployment preview from netlify
- [x] we have some dependencies that we always want to install in the latest version, like line-design-tokens. We could add `npm up lyne-design-token` to the travis config. But it would be better if latest line-design-tokens would be installed after `npm install`. Find a way to do so.
- [x] In Travis, build logs are cluttered. Lower log level for semantic-release/npm publish and npm install -g netlify-cli
- [x] When pushing to main, PREVIEWS.md is not created.
- [x] Assumption: we delete branches after merging. In that case, we should just write branch-names on the deployments page instead of links, since we're not sure how long those links will be valid.
- [x] npm package size is huge!
- [x] enhance for all stages `- npm run test:prod` with `|| travis_terminate 1` in `.travis.yml` so tests are run before release gets made (can be done in late alpha or beta phase).
- [x] If tests are run, a coverage report is generated in the `coverage` folder. Should we make it available to the public somewhere?
- [ ] chromatic sometimes takes a snapshot before a component has loaded in the dom. we currently add a delay of 1000ms to chromatic inside the stories files to prevent that. Probably chromatic will improve so that we can remove the delay.
- Upload to codecov.io runs always into a timeout: `curl: (7) Failed to connect to codecov.io port 443: Connection timed out`
- [ ] travis.yml, for main builds -> designTokensUpdate -> this might install newer versions of design-tokens and icons. after that, if no new version is released by semantic release, we must manually commit package.json and lock file and push it back to the repo.

#### Check

✅ Nothing to check

#### Verify

✅ Nothing to verify at the moment

- [x] For how long are deployments saved on Netlify? Forever? 30 days? 1 year?
  - [x] Forever until the site gets deleted ... see [here](https://community.netlify.com/t/does-each-deploy-preview-stay-available-forever/12601)
- [x] For merge checks on Travis: make sure semantic-release and deploy does not run
- [x] After merging a PR, the script to generate the release urls might fail. Check to make sure it does not run into merge-conflicts or similar

#### Issues

✅ No issues

## Documentation

- [ ] The release-badge in the [README.md](./README.md) file is out of sync sometimes ...
- [ ] Document roadmap in [docs/ROADMAP.md](docs/ROADMAP.md)
- [x] Document release process in [docs/RELEASING.md](docs/RELEASING.md) --> moved to [docs/CICD.md](docs/CICD.md) document
- [x] Modify content of sustainability-policy file to match our own vision and policies.
- [x] Add documentation for [docs/CICD.md](docs/CICD.md) pipeline
- [x] Define and document terminology in [docs/TERMINOLOGY.md](docs/TERMINOLOGY.md)
- [x] Document vision in [docs/VISION.md](docs/VISION.md)

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
