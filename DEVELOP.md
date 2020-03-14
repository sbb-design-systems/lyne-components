## Linting
Typescript-ESLint is configured in this project. Make sure your editor catches eslint errors. Linting will be run on CI before test and build. If linting fails, the build will fail. To run ESLint on the command line run

```bash
npm run lint
```

## Branch Deployments

If you commit and push your changes on a branch, a deploy preview is created on netlify. You find a list of all branches along with their netlify deploy url in the file BRANCHES.md

## package.json

### npm scripts
| Script        | Purpose       |
| ------------- | ------------- |
|build:stencil|used to create a production build for stencil components|
|build:storybook|used to build storybook static site|
|build|runs build:stencil and build:storybook in sequence|
|generate|start the interactive component generator|
|lint|run typescript-eslint|
|semantic-release|start a semantic release|
|start:stencil|start the development server for stencil|
|start:storybook|start the development server for storybook|
|start|runs start:stencil and start:storybook in parallel|
|test|run all unit and e2e tests|
|test.watch|run all unit and e2e tests in watch mode|

### devDependencies
| Dependency        | Purpose       | Docs |
| ----------------- | ------------- | ---- |
|@babel/core|core babel library|https://github.com/babel/babel/tree/master/packages/babel-core|
|@babel/plugin-syntax-jsx|Used to support jsx in storybook stories files|https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-jsx|
|@babel/plugin-transform-react-jsx|Used to support jsx in storybook stories files|https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx|
|@commitlint/cli|cli utility for semantic-release|https://github.com/conventional-changelog/commitlint|
|@commitlint/config-conventional|stadard semantic-release convention rules|https://github.com/conventional-changelog/commitlint|
|@semantic-release/changelog|generate a changelog file with all release notes.|https://github.com/semantic-release/changelog|
|@semantic-release/exec|plugin to execute custom shell commands.|https://github.com/semantic-release/exec|
|@semantic-release/git|allow semantic release to push back into the source github repo.|https://github.com/semantic-release/git|
|@stencil/core|StencilJS core library|https://stenciljs.com/|
|@storybook/addon-a11y|a11y addons for storybook|https://www.npmjs.com/package/@storybook/addon-a11y|
|@storybook/addon-actions|Add actions to storybook stories|https://github.com/storybookjs/storybook/tree/master/addons/actions|
|@storybook/addon-knobs|Add knobs to storybook stories|https://github.com/storybookjs/storybook/tree/next/addons/knobs|
|@storybook/addon-notes|allow for writing notes for stories. Used for storybook integration|https://github.com/storybookjs/storybook|
|@storybook/html|storybook for plain HTML snippets|https://github.com/storybookjs/storybook|
|@types/jest|TypeScript definitions for jest|https://github.com/DefinitelyTyped/DefinitelyTyped#readme|
|@types/puppeteer|TypeScript definitions for Puppeteer|https://github.com/DefinitelyTyped/DefinitelyTyped#readme|
|@typescript-eslint/eslint-plugin|TypeScript support for ESLint|https://github.com/typescript-eslint/typescript-eslint|
|@typescript-eslint/parser|TypeScript support for ESLint|https://github.com/typescript-eslint/typescript-eslint|
|axios|Promise based HTTP client for the browser and node.js|https://www.npmjs.com/package/axios|
|babel-loader|webpack loader to transpile js files using babel. Used for Storybook integration|https://www.npmjs.com/package/babel-loader|
|copy-webpack-plugin|copy files to build directory during webpack build. Used for Storybook integration|https://github.com/webpack-contrib/copy-webpack-plugin|
|eslint|Linter for JavaScript|https://github.com/eslint/eslint|
|husky|easily add git hooks|https://github.com/typicode/husky|
|jest|used for unit tests|https://jestjs.io/|
|jest-cli|cli utility for jest|https://jestjs.io/|
|jsx-dom|Used to support jsx in storybook stories files|https://github.com/proteriax/jsx-dom|
|mini-css-extract-plugin|webpack: extract css from js|https://webpack.js.org/plugins/mini-css-extract-plugin/|
|npm-run-all|run npm-scripts in parallel or sequential|https://github.com/mysticatea/npm-run-all|
|puppeteer|used for e2e tests|https://github.com/puppeteer/puppeteer#readme|
|semantic-release|Used to start semantic release|https://github.com/semantic-release/semantic-release|
|semantic-release-slack-bot|Used to get slack notifications from semantic-release|https://github.com/juliuscc/semantic-release-slack-bot|
|shelljs|used to support unix exit commands in node|https://www.npmjs.com/package/shelljs|
|simple-git|A light weight interface for running git commands in any node.js application.|https://www.npmjs.com/package/simple-git|
|write-file-webpack-plugin|write webpack dev server files to file system. Used for Storybook integration|https://github.com/gajus/write-file-webpack-plugin|
|yargs|Easy parsing arguments from the command line|https://www.npmjs.com/package/yargs|

## Config files
| File        | Purpose       | Docs |
| ------------| ------------- | ---- |
|.babelrc|base config for babel|https://babeljs.io/docs/en/config-files|
|.editorconfig|coding style definitions|https://editorconfig.org/|
|.eslintignore|Files to ignore for ESLint|https://eslint.org/docs/user-guide/configuring|
|.eslintrc|Config for ESLint|https://eslint.org/docs/user-guide/configuring|
|.gitignore|files git should ignore|https://git-scm.com/docs/gitignore|
|.huskyrc.js|configurations for husky|https://github.com/typicode/husky|
|.jest.config.js|configuration for jest|https://jestjs.io/docs/en/configuration.html|
|.nvmrc|node version to use by nvm or asdf|https://github.com/nvm-sh/nvm|
|.releaserc|configuration for semantic-release|https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration|
|.travis.yml|build configuration for travisCI|https://docs.travis-ci.com/user/customizing-the-build/|
|commitlint.config.js|configuration for commitlint|https://github.com/conventional-changelog/commitlint|
|stencil.config.json|stencilJS configuration|https://stenciljs.com/docs/config|
|tsconfig.json|configurations for typeScript|https://www.typescriptlang.org/docs/handbook/tsconfig-json.html|

## Special Folders
| File        | Purpose       |
| ------------| ------------- |
|./ci|contains skripts that are used by the CI|
|./.storybook|main configuration for storybook setup|

## Outputs
|Folder|Explanation|
|------|-----------|
|./dist|main output target for stencil components|
|./www|build target for stencil dev server|
|./storybook-static|rendered static storybook site|

## Checks & monitoring

### Git Guardian
Git Guardian is activated for this repo: https://dashboard.gitguardian.com/

### Code Coverage
Codecoverage is evalauted from Jest's --coverage output via https://codecov.io/

### Additional Code Checks
Additional checks are done with https://www.deepcode.ai/. Login there to see the reports.
