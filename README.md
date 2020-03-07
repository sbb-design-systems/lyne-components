[![Build Status](https://travis-ci.org/lyne-design-system/lyne-components.svg?branch=master)](https://travis-ci.org/lyne-design-system/lyne-components) [![Greenkeeper badge](https://badges.greenkeeper.io/lyne-design-system/lyne-components.svg)](https://greenkeeper.io/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<h1 align="center">
  Lyne Components
</h1>

> Lyne Components are the building blocks of the Lyne Design System
> and are based on standard compliant [Web Components](https://www.webcomponents.org/specs)
> compiled by StencilJS and browsable through Storybook

## Todo
- Rename package name to "lyne-components"
- Decide for Branching-Model
- Add Merge Checks
- Add Linter
- Repo -> Insights -> Community -> Fullfill checklist
- Semantic-release updates version in package.json, but in the package-lock.json it does not
- Prevent push to master
- In Storybook build: ommit webpack verbose mode since it is logging too much uniformative stuff
- Documentation (update / add)
  - RELEASING.md
  - DEVELOP.md
  - .github
- npm script ```start``` runs stencil and storybook in parallel. We need sequential. Problem is that ```start:stencil``` has no exit code since it is serving and watching, so the second sequential command ```start:storybook``` is not run. Quick fix is to run them parallel.
- In Storybook, css changes are not updated in watch mode
- Different secrets and env-variables on git, travis and netlify.
  - Document exactly which key is needed for what and where to generate it
  - Before production: regenerate all keys
- refactor build_release_urls.js with promises
- optimize storybook build (check .min...)
- for DEPLOYMENTS.md: in which timezone should we format the date?
- DEPLOYMENTS.md might get large over time. Should we limit it to x releases?
- ommit output when netlify_deploy.sh is called on travis
- update documentation to adhere to the latest changes
- add the node command for DEPLOYMENTS.md used in travis job to a shell script

# SemVer
We use semantic versioning

# Git Guardian
Git Guardian is activated for this repo: https://dashboard.gitguardian.com/

# npm
The production build of the components can be found here on npm: https://www.npmjs.com/package/lyne-test

# Storybook
The storybook is deployed on netlify an can be found here: https://lyne-components-storybook.netlify.com

For a full list of deployments of all releases, please look here: https://github.com/lyne-design-system/lyne-components/blob/master/DEPLOYMENTS.md

## 🙌 Contributing
See [Contributing Guide](/.github/CONTRIBUTING.md) and thanks already in advance! 👀

## Developing
See [DEVELOP.md](./DEVELOP.md) for development docs.

## Releasing
You can find docs about our release process in [RELEASING.md](./RELEASING.md).

## Documentation


## 📝 License

Licensed under the [MIT](/LICENSE).
