[![Build Status](https://travis-ci.org/lyne-design-system/lyne-components.svg?branch=master)](https://travis-ci.org/lyne-design-system/lyne-components) [![Greenkeeper badge](https://badges.greenkeeper.io/lyne-design-system/lyne-components.svg)](https://greenkeeper.io/)

# Todo
- Rename package name to "lyne-components"
- Decide for Branching-Model
- Add Merge Checks
- Add Linter
- Repo -> Insights -> Community -> Fullfill checklist
- Semantic-release updates version in package.json, but in the package-lock.json it does not
- Prevent push to master

# package.json

## npm scripts

| Script        | Purpose       |
| ------------- | ------------- |
|build|used to create a production build|
|start|start the development server|
|test|run all unit and e2e tests|
|test.watch|run all unit and e2e tests in watch mode|
|generate|start the interactive component generator|
|semantic-release|start a semantic release|

# devDependencies

| Dependency        | Purpose       | Docs |
| ----------------- | ------------- | ---- |
|@commitlint/cli|cli utility for semantic-release|https://github.com/conventional-changelog/commitlint|
|@commitlint/config-conventional|stadard semantic-release convention rules|https://github.com/conventional-changelog/commitlint|
|@semantic-release/changelog|generate a changelog file with all release notes|https://github.com/conventional-changelog/commitlint|
|@semantic-release/git|allow semantic release to push back into the source github repo|https://github.com/conventional-changelog/commitlint|
|@stencil/core|StencilJS core library|https://stenciljs.com/|
|@types/jest|TypeScript definitions for jest|https://github.com/DefinitelyTyped/DefinitelyTyped#readme|
|@types/puppeteer|TypeScript definitions for Puppeteer|https://github.com/DefinitelyTyped/DefinitelyTyped#readme|
|husky|easily add git hooks|https://github.com/typicode/husky|
|jest|used for unit tests|https://jestjs.io/|
|jest-cli|cli utility for jest|https://jestjs.io/|
|puppeteer|used for e2e tests|https://github.com/puppeteer/puppeteer#readme|
|semantic-release|used to lint commit messages according to semantic-release guidelines|https://github.com/conventional-changelog/commitlint|

# Config files

| File        | Purpose       | Docs |
| ------------| ------------- | ---- |
|.editorconfig|coding style definitions|https://editorconfig.org/|
|.gitignore|files git should ignore|https://git-scm.com/docs/gitignore|
|.huskyrc.js|configurations for husky|https://github.com/typicode/husky|
|.nvmrc|node version to use by nvm or asdf|https://github.com/nvm-sh/nvm|
|.releaserc|configuration for semantic-release|https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration|
|.travis.yml|build configuration for travisCI|https://docs.travis-ci.com/user/customizing-the-build/|
|commitlint.config.js|configuration for commitlint|https://github.com/conventional-changelog/commitlint|
|greenkeeper.json|configuration for greenkeeper|https://greenkeeper.io/docs.html|
|stencil.config.json|stencilJS configuration|https://stenciljs.com/docs/config|
|tsconfig.json|configurations for typeScript|https://www.typescriptlang.org/docs/handbook/tsconfig-json.html|
