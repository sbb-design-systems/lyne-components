## Linting

TypeScript-ESLint is configured for this project. Make sure your editor catches ESLint errors. Linting will be run on CI before the test and build step. If linting fails, the build will fail. To run ESLint on the command line run

```bash
npm run lint
```

## Branch Deployments

If you `commit` and `push` your changes on a branch, a [Preview Deployment](https://github.com/lyne-design-system/lyne/blob/main/docs/TERMINOLOGY.md#preview-deployment) is created on Netlify.

You can find a list of all branches along with their Netlify deployment URL here: [https://lyne-documentation.netlify.app/en/deployments](https://lyne-documentation.netlify.app/en/deployments).

## package.json

### npm scripts

| Script             | Purpose                                                                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:components` | Create a production build of Lit components                                                                                                                                                                                                                |
| `build:storybook`  | Build Storybook [Component Browser](https://github.com/lyne-design-system/lyne/blob/main/docs/TERMINOLOGY.md#component-browser) based on our [Storybook Stories](https://github.com/lyne-design-system/lyne/blob/main/docs/TERMINOLOGY.md#storybook-story) |
| `build`            | Run `build:components` and `build:storybook` sequentially                                                                                                                                                                                                  |
| `docs`             | Run `docs:manifest` and `docs:to-md` sequentially to regen docs files                                                                                                                                                                                      |
| `format`           | Run `prettier` to format every supported file                                                                                                                                                                                                              |
| `generate`         | Start the interactive component generator                                                                                                                                                                                                                  |
| `integrity`        | Run `format` and `docs`                                                                                                                                                                                                                                    |
| `lint`             | Run TypeScript-ESLint                                                                                                                                                                                                                                      |
| `start`            | Run `storybook` local development and open it on browser                                                                                                                                                                                                   |
| `test`             | Run all unit and e2e tests                                                                                                                                                                                                                                 |
| `test:spec`        | Run all spec tests                                                                                                                                                                                                                                         |
| `test:e2e`         | Run all e2e tests                                                                                                                                                                                                                                          |
| `prepare`          | Install Husky                                                                                                                                                                                                                                              |

### devDependencies

| Dependency                            | Purpose                                                                                       | Docs                                                                                   |
| ------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| @commitlint/cli                       | cli utility for semantic-release                                                              | https://github.com/conventional-changelog/commitlint                                   |
| @commitlint/config-conventional       | standard semantic-release convention rules                                                    | https://github.com/conventional-changelog/commitlint                                   |
| @custom-elements-manifest/analyzer    | file format that describes custom elements                                                    | https://github.com/open-wc/custom-elements-manifest                                    |
| @custom-elements-manifest/to-markdown | file format that describes custom elements                                                    | https://github.com/open-wc/custom-elements-manifest                                    |
| @open-wc/lit-helpers                  | library with helpers functions for lit                                                        | https://github.com/open-wc/open-wc/tree/master/packages/lit-helpers                    |
| @open-wc/testing                      | package of testing libraries                                                                  | https://github.com/open-wc/open-wc/tree/master/packages/testing                        |
| @storybook/addon-a11y                 | a11y addons for storybook                                                                     | https://www.npmjs.com/package/@storybook/addon-a11y                                    |
| @storybook/addon-actions              | add actions to storybook stories                                                              | https://github.com/storybookjs/storybook/tree/master/addons/actions                    |
| @storybook/addon-essentials           | curated addons to bring out the best of storybook                                             | https://github.com/storybookjs/storybook/tree/next/code/addons/essentials              |
| @storybook/addon-interactions         | automate, test and debug user interactions                                                    | https://github.com/storybookjs/storybook/tree/next/code/addons/interactions            |
| @storybook/addon-links                | link stories together to build demos and prototypes with your UI components                   | https://github.com/storybookjs/storybook/tree/master/addons/actions                    |
| @storybook/blocks                     | storybook doc blocks                                                                          | https://github.com/storybookjs/storybook/tree/next/code/addons/links                   |
| @storybook/builder-vite               | plugin to run and build storybooks with vite                                                  | https://github.com/storybookjs/storybook/tree/next/code/builders/builder-vite/#readme  |
| @storybook/testing-library            | instrumented version of testing library for storybook interactions                            | https://github.com/storybookjs/testing-library#readme                                  |
| @storybook/web-components             | storybook web-components renderer                                                             | https://github.com/storybookjs/storybook/tree/next/code/renderers/web-components       |
| @storybook/web-components-vite        | storybook for web-components and vite: develop web components in isolation with hot reloading | https://github.com/storybookjs/storybook/tree/next/code/frameworks/web-components-vite |
| @types/glob                           | TypeScript definitions for glob                                                               | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/glob              |
| @types/node                           | TypeScript definitions for node                                                               | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node              |
| @types/react                          | TypeScript definitions for react                                                              | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react             |
| @types/react-dom                      | TypeScript definitions for react-dom                                                          | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom         |
| @typescript-eslint/eslint-plugin      | TypeScript support for ESLint                                                                 | https://github.com/typescript-eslint/typescript-eslint                                 |
| @typescript-eslint/parser             | TypeScript support for ESLint                                                                 | https://github.com/typescript-eslint/typescript-eslint                                 |
| @web/test-runner                      | test runner for web applications                                                              | https://github.com/modernweb-dev/web/tree/master/packages/test-runner                  |
| @web/test-runner-commands             | web test runner commands                                                                      | https://github.com/modernweb-dev/web/tree/master/packages/test-runner-commands         |
| @web/test-runner-playwright           | playwright browser launcher for Web Test Runner                                               | https://github.com/modernweb-dev/web/tree/master/packages/test-runner-playwright       |
| @web/test-runner-puppeteer            | puppeteer browser launcher for Web Test Runner                                                | https://github.com/modernweb-dev/web/tree/master/packages/test-runner-puppeteer        |
| chromatic                             | automate visual testing across browsers and gather UI feedback                                | https://www.chromatic.com/                                                             |
| date-fns                              | modern JavaScript date utility library                                                        | https://github.com/date-fns/date-fns#readme                                            |
| eslint                                | linter for JavaScript                                                                         | https://github.com/eslint/eslint                                                       |
| glob                                  | match files using the patterns the shell uses                                                 | https://github.com/isaacs/node-glob#readme                                             |
| husky                                 | easily add git hooks                                                                          | https://github.com/typicode/husky                                                      |
| lint-staged                           | lint files staged by git                                                                      | https://github.com/okonet/lint-staged#readme                                           |
| madge                                 | create graphs from module dependencies                                                        | https://github.com/pahen/madge                                                         |
| npm-run-all                           | run npm-scripts in parallel or sequential                                                     | https://github.com/mysticatea/npm-run-all                                              |
| playwright                            | a high-level API to automate web browsers                                                     | https://playwright.dev                                                                 |
| postcss                               | tool for transforming styles with JS plugins                                                  | https://postcss.org/                                                                   |
| prettier                              | an opinionated code formatter                                                                 | https://prettier.io/                                                                   |
| react                                 | JavaScript library for building user interfaces                                               | https://reactjs.org/                                                                   |
| react-dom                             | React package for working with the DOM                                                        | https://reactjs.org/                                                                   |
| sass                                  | pure JavaScript implementation of Sass                                                        | https://github.com/sass/dart-sass                                                      |
| storybook                             | Storybook CLI                                                                                 | https://github.com/storybookjs/storybook/tree/next/code/lib/cli                        |
| stylelint                             | CSS linter that helps you avoid errors and enforce conventions                                | https://stylelint.io/                                                                  |
| ts-lit-plugin                         | Typescript plugin that adds type checking and code completion to lit-html                     | https://github.com/runem/lit-analyzer#readme                                           |
| tsx                                   | TypeScript Execute (tsx): Node.js enhanced with esbuild to run TypeScript & ESM files         | https://github.com/esbuild-kit/tsx#readme                                              |
| typescript                            | language for application scale JavaScript development                                         | https://www.typescriptlang.org/                                                        |
| vite                                  | Native-ESM powered web dev build tool                                                         | https://github.com/vitejs/vite/tree/main/#readme                                       |
| vite-plugin-dts                       | plugin that generates declaration files                                                       | https://github.com/qmhc/vite-plugin-dts#readme                                         |

## Config files

| File                               | Purpose                                | Docs                                                            |
| ---------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| .babelrc                           | base config for babel                  | https://babeljs.io/docs/en/config-files                         |
| .editorconfig                      | coding style definitions               | https://editorconfig.org/                                       |
| .eslintignore                      | files to ignore for ESLint             | https://eslint.org/docs/user-guide/configuring                  |
| .eslintrc.json                     | config for ESLint                      | https://eslint.org/docs/user-guide/configuring                  |
| .gitignore                         | files git should ignore                | https://git-scm.com/docs/gitignore                              |
| .nvmrc                             | node version to use by nvm or asdf     | https://github.com/nvm-sh/nvm                                   |
| .prettierignore                    | files to ignore for Prettier           | https://prettier.io/docs/en/ignore.html                         |
| commitlint.config.js               | configuration for commitlint           | https://github.com/conventional-changelog/commitlint            |
| custom-elements-manifest.config.js | custom config for codegen              | https://custom-elements-manifest.open-wc.org/analyzer/config/   |
| renovate.json                      | configuration options for Renovate     | https://docs.renovatebot.com/configuration-options/             |
| tsconfig.json                      | configurations for typeScript          | https://www.typescriptlang.org/docs/handbook/tsconfig-json.html |
| vite.config.ts                     | configuration file for Vite            | https://vitejs.dev/config/                                      |
| web-test-runner.config.js          | configuration file for Web test runner | https://modern-web.dev/docs/test-runner/cli-and-configuration/  |

## Special Folders

| File         | Purpose                                  |
| ------------ | ---------------------------------------- |
| ./ci         | contains skripts that are used by the CI |
| ./.storybook | main configuration for storybook setup   |

## Outputs

| Folder            | Explanation                           |
| ----------------- | ------------------------------------- |
| ./dist/components | main output target for web-components |
| ./dist/react      | output target for the react library   |
| ./dist/storybook  | rendered static storybook site        |

## Checks & monitoring

### Git Guardian

Git Guardian is activated for this repo: https://dashboard.gitguardian.com/

### Code Coverage

Codecoverage is evalauted with --coverage output via https://codecov.io/

### Additional Code Checks

Additional checks are done with https://www.deepcode.ai/. Login there to see the reports.
