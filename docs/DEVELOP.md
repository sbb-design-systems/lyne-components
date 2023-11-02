## Linting

TypeScript-ESLint is configured for this project. Make sure your editor catches ESLint errors. Linting will be run on CI before the test and build step. If linting fails, the build will fail. To run ESLint on the command line run

```bash
npm run lint
```

## Branch Deployments

If you `commit` and `push` your changes on a branch, a [Preview Deployment](https://github.com/lyne-design-system/lyne/blob/master/docs/TERMINOLOGY.md#preview-deployment) is created on Netlify.

You can find a list of all branches along with their Netlify deployment URL here: [https://lyne-documentation.netlify.app/en/deployments](https://lyne-documentation.netlify.app/en/deployments).

## package.json

### npm scripts

| Script             | Purpose                                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build:components` | Create a production build of Lit components                                                                                                                                                                                                                    |
| `build:storybook`  | Build Storybook [Component Browser](https://github.com/lyne-design-system/lyne/blob/master/docs/TERMINOLOGY.md#component-browser) based on our [Storybook Stories](https://github.com/lyne-design-system/lyne/blob/master/docs/TERMINOLOGY.md#storybook-story) |
| `build`            | Run `build:components` and `build:storybook` sequentially                                                                                                                                                                                                      |
| `docs`             | Run `docs:manifest` and `docs:to-md` sequentially to regen docs files                                                                                                                                                                                          |
| `format`           | Run `prettier` to format every supported file                                                                                                                                                                                                                  |
| `generate`         | Start the interactive component generator                                                                                                                                                                                                                      |
| `integrity`        | Run `format` and `docs`                                                                                                                                                                                                                                        |
| `lint`             | Run TypeScript-ESLint                                                                                                                                                                                                                                          |
| `start`            | Run `storybook` local development and open it on browser                                                                                                                                                                                                       |
| `test`             | Run all unit and e2e tests                                                                                                                                                                                                                                     |
| `test:spec`        | Run all spec tests                                                                                                                                                                                                                                             |
| `test:e2e`         | Run all e2e tests                                                                                                                                                                                                                                              |
| `prepare`          | Install Husky                                                                                                                                                                                                                                                  |

### devDependencies

| Dependency                            | Purpose                                                                                        | Docs                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| @commitlint/cli                       | cli utility for semantic-release                                                               | https://github.com/conventional-changelog/commitlint                                   |
| @commitlint/config-conventional       | standard semantic-release convention rules                                                     | https://github.com/conventional-changelog/commitlint                                   |
| @custom-elements-manifest/analyzer    | file format that describes custom elements                                                     | https://github.com/open-wc/custom-elements-manifest                                    |
| @custom-elements-manifest/to-markdown | file format that describes custom elements                                                     | https://github.com/open-wc/custom-elements-manifest                                    |
| @open-wc/lit-helpers                  | library with helpers functions for lit                                                         | https://github.com/open-wc/open-wc/tree/master/packages/lit-helpers                    |
| @open-wc/testing                      | package of testing libraries                                                                   | https://github.com/open-wc/open-wc/tree/master/packages/testing                        |
| @storybook/addon-a11y                 | a11y addons for storybook                                                                      | https://www.npmjs.com/package/@storybook/addon-a11y                                    |
| @storybook/addon-actions              | Add actions to storybook stories                                                               | https://github.com/storybookjs/storybook/tree/master/addons/actions                    |
| @storybook/addon-essentials           | Curated addons to bring out the best of Storybook                                              | https://github.com/storybookjs/storybook/tree/next/code/addons/essentials              |
| @storybook/addon-interactions         | Automate, test and debug user interactions                                                     | https://github.com/storybookjs/storybook/tree/next/code/addons/interactions            |
| @storybook/addon-links                | Link stories together to build demos and prototypes with your UI components                    | https://github.com/storybookjs/storybook/tree/master/addons/actions                    |
| @storybook/blocks                     | Storybook Doc Blocks                                                                           | https://github.com/storybookjs/storybook/tree/next/code/addons/links                   |
| @storybook/builder-vite               | Plugin to run and build Storybooks with Vite                                                   | https://github.com/storybookjs/storybook/tree/next/code/builders/builder-vite/#readme  |
| @storybook/testing-library            | Instrumented version of Testing Library for Storybook Interactions                             | https://github.com/storybookjs/testing-library#readme                                  |
| @storybook/web-components             | Storybook web-components renderer                                                              | https://github.com/storybookjs/storybook/tree/next/code/renderers/web-components       |
| @storybook/web-components-vite        | Storybook for web-components and Vite: Develop Web Components in isolation with Hot Reloading. | https://github.com/storybookjs/storybook/tree/next/code/frameworks/web-components-vite |
| @types/glob                           | TypeScript definitions for glob                                                                | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/glob              |
| @types/node                           | TypeScript definitions for node                                                                | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node              |
| @types/react                          | TypeScript definitions for react                                                               | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react             |
| @types/react-dom                      | TypeScript definitions for react-dom                                                           | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom         |
| @typescript-eslint/eslint-plugin      | TypeScript support for ESLint                                                                  | https://github.com/typescript-eslint/typescript-eslint                                 |
| @typescript-eslint/parser             | TypeScript support for ESLint                                                                  | https://github.com/typescript-eslint/typescript-eslint                                 |
| @web/test-runner                      | Test runner for web applications                                                               | https://github.com/modernweb-dev/web/tree/master/packages/test-runner                  |
| @web/test-runner-commands             | Web test runner commands                                                                       | https://github.com/modernweb-dev/web/tree/master/packages/test-runner-commands         |
| @web/test-runner-playwright           | Playwright browser launcher for Web Test Runner                                                | https://github.com/modernweb-dev/web/tree/master/packages/test-runner-playwright       |
| @web/test-runner-puppeteer            | Puppeteer browser launcher for Web Test Runner                                                 | https://github.com/modernweb-dev/web/tree/master/packages/test-runner-puppeteer        |
| eslint                                | Linter for JavaScript                                                                          | https://github.com/eslint/eslint                                                       |
| husky                                 | easily add git hooks                                                                           | https://github.com/typicode/husky                                                      |
| jest                                  | used for unit tests                                                                            | https://jestjs.io/                                                                     |
| jest-cli                              | cli utility for jest                                                                           | https://jestjs.io/                                                                     |
| jsx-dom                               | Used to support jsx in storybook stories files                                                 | https://github.com/proteriax/jsx-dom                                                   |
| npm-run-all                           | run npm-scripts in parallel or sequential                                                      | https://github.com/mysticatea/npm-run-all                                              |
| puppeteer                             | used for e2e tests                                                                             | https://github.com/puppeteer/puppeteer#readme                                          |
| semantic-release                      | Used to start semantic release                                                                 | https://github.com/semantic-release/semantic-release                                   |
| shelljs                               | used to support unix exit commands in node                                                     | https://www.npmjs.com/package/shelljs                                                  |
| yargs                                 | Easy parsing arguments from the command line                                                   | https://www.npmjs.com/package/yargs                                                    |

## Config files

| File                 | Purpose                            | Docs                                                                                                       |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| .babelrc             | base config for babel              | https://babeljs.io/docs/en/config-files                                                                    |
| .editorconfig        | coding style definitions           | https://editorconfig.org/                                                                                  |
| .eslintignore        | Files to ignore for ESLint         | https://eslint.org/docs/user-guide/configuring                                                             |
| .eslintrc            | Config for ESLint                  | https://eslint.org/docs/user-guide/configuring                                                             |
| .gitignore           | files git should ignore            | https://git-scm.com/docs/gitignore                                                                         |
| .huskyrc.js          | configurations for husky           | https://github.com/typicode/husky                                                                          |
| .jest.config.js      | configuration for jest             | https://jestjs.io/docs/en/configuration.html                                                               |
| .nvmrc               | node version to use by nvm or asdf | https://github.com/nvm-sh/nvm                                                                              |
| .releaserc           | configuration for semantic-release | https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration |
| commitlint.config.js | configuration for commitlint       | https://github.com/conventional-changelog/commitlint                                                       |
| stencil.config.json  | stencilJS configuration            | https://stenciljs.com/docs/config                                                                          |
| tsconfig.json        | configurations for typeScript      | https://www.typescriptlang.org/docs/handbook/tsconfig-json.html                                            |

## Special Folders

| File         | Purpose                                  |
| ------------ | ---------------------------------------- |
| ./ci         | contains skripts that are used by the CI |
| ./.storybook | main configuration for storybook setup   |

## Outputs

| Folder             | Explanation                               |
| ------------------ | ----------------------------------------- |
| ./dist             | main output target for stencil components |
| ./www              | build target for stencil dev server       |
| ./storybook-static | rendered static storybook site            |

## Checks & monitoring

### Git Guardian

Git Guardian is activated for this repo: https://dashboard.gitguardian.com/

### Code Coverage

Codecoverage is evalauted from Jest's --coverage output via https://codecov.io/

### Additional Code Checks

Additional checks are done with https://www.deepcode.ai/. Login there to see the reports.
