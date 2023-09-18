# Developer guide: getting your environment set up

1. Make sure you have both `node` and `yarn` installed.
   We recommend using `nvm` to manage your node versions.
2. From the root of the project, run `yarn` to install the dependencies.

There are currently some unknown problems with developing on Windows when working with SASS,
so we recommend using WSL2 to develop on Windows machines.

To bring up a local server, run `yarn start`. This will automatically watch for changes
and rebuild. The browser should refresh automatically when changes are made.

## Linting

We use [prettier](https://prettier.io/) and [eslint](https://eslint.org/) in our project.
Both are configured as pre-commit hooks and are verified via GitHub Actions CI.

Run `yarn format` to format the whole codebase with prettier.

Run `yarn lint --fix` to fix any automatically fixable lint issues and report the other issues.

## Outputs

| Folder            | Explanation                           |
| ----------------- | ------------------------------------- |
| ./dist/components | main output target for web-components |
| ./dist/react      | output target for the react library   |
| ./dist/storybook  | rendered static storybook site        |

## Running tests

To run unit tests, run `yarn test:watch`.

## Starting showcase

To start the showcase, run `yarn start`. This will run the devserver in watch mode.
