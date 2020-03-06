# Issues
- If you commit a fix and the merge the latest master before pushing, semantic-release won't do a new release: 'The local branch master is behind the remote one, therefore a new version won't be published.' -> https://travis-ci.org/lyne-design-system/lyne-components/jobs/658782240

# Verify
- If a travis release job is running, semantic-release did not run yet, and a new change is pushed to master, what happens? Travis should not make a new release, but make another build afterwards with both changes

# package.json

## npm scripts
| Script        | Purpose       |
| ------------- | ------------- |
|build:stencil|used to create a production build for stencil components|
|build:storybook|used to build storybook static site|
|build|runs build:stencil and build:storybook in sequence|
|start:stencil|start the development server for stencil|
|start:storybook|start the development server for storybook|
|start|runs start:stencil and start:storybook in parallel|
|test|run all unit and e2e tests|
|test.watch|run all unit and e2e tests in watch mode|
|generate|start the interactive component generator|
|semantic-release|start a semantic release|

## devDependencies
| Dependency        | Purpose       | Docs |
| ----------------- | ------------- | ---- |
|@babel/core|core babel library|https://github.com/babel/babel/tree/master/packages/babel-core|
|@babel/plugin-syntax-jsx|Used to support jsx in storybook stories files|https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-jsx|
|@babel/plugin-transform-react-jsx|Used to support jsx in storybook stories files|https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx|
|@commitlint/cli|cli utility for semantic-release|https://github.com/conventional-changelog/commitlint|
|@commitlint/config-conventional|stadard semantic-release convention rules|https://github.com/conventional-changelog/commitlint|
|@semantic-release/changelog|generate a changelog file with all release notes|https://github.com/conventional-changelog/commitlint|
|@semantic-release/git|allow semantic release to push back into the source github repo|https://github.com/conventional-changelog/commitlint|
|@stencil/core|StencilJS core library|https://stenciljs.com/|
|@storybook/addon-actions|Add actions to storybook stories|https://github.com/storybookjs/storybook/tree/master/addons/actions|
|@storybook/addon-knobs|Add knobs to storybook stories|https://github.com/storybookjs/storybook/tree/next/addons/knobs|
|@storybook/addon-notes|allow for writing notes for stories. Used for storybook integration|https://github.com/storybookjs/storybook|
|@storybook/html|storybook for plain HTML snippets|https://github.com/storybookjs/storybook|
|@types/jest|TypeScript definitions for jest|https://github.com/DefinitelyTyped/DefinitelyTyped#readme|
|@types/puppeteer|TypeScript definitions for Puppeteer|https://github.com/DefinitelyTyped/DefinitelyTyped#readme|
|babel-loader|webpack loader to transpile js files using babel. Used for Storybook integration|https://www.npmjs.com/package/babel-loader|
|copy-webpack-plugin|copy files to build directory during webpack build. Used for Storybook integration|https://github.com/webpack-contrib/copy-webpack-plugin|
|husky|easily add git hooks|https://github.com/typicode/husky|
|jest|used for unit tests|https://jestjs.io/|
|jest-cli|cli utility for jest|https://jestjs.io/|
|jsx-dom|Used to support jsx in storybook stories files|https://github.com/proteriax/jsx-dom|
|npm-run-all|run npm-scripts in parallel or sequential|https://github.com/mysticatea/npm-run-all|
|puppeteer|used for e2e tests|https://github.com/puppeteer/puppeteer#readme|
|semantic-release|used to lint commit messages according to semantic-release guidelines|https://github.com/conventional-changelog/commitlint|
|write-file-webpack-plugin|write webpack dev server files to file system. Used for Storybook integration|https://github.com/gajus/write-file-webpack-plugin|

# Config files
| File        | Purpose       | Docs |
| ------------| ------------- | ---- |
|.babelrc|base config for babel|https://babeljs.io/docs/en/config-files|
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

# Special Folders
| File        | Purpose       |
| ------------| ------------- |
|./ci|contains skripts that are used by the CI|
|./.storybook|main configuration for storybook setup|

# Outputs
|Folder|Explanation|
|------|-----------|
|./dist|main output target for stencil components|
|./www|build target for stencil dev server|
|./storybook-static|rendered static storybook site|
