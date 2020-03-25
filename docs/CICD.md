# CI/CD

## SemVer
We adhere to the semantic versioning standard. With each merge into master, the potential next version is automatically determined by the `sematic-release` package.

Only commits that adhere to the `Conventional Commits` standard ([https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)) will trigger semantic releases accordingly.

To make sure developers properly style their commit messages, we use `husky` together with `commit-lint`.

## Tools
- Travis: CI & CD is done on Travis CI.
- GitHub: Travis listens to changes in any branch on this repo.
- Netlify: The storybook build and the deployments page are deployed to Netlify.
- Codecov: A report for code coverage is created for each release and uploaded to [Codecov](https://codecov.io/bash).

## Artefacts

The following build artefacts are relevant for deployments:
- `./dist` & `./loader`: stencil components that are published to npm
- `./storybook-static`: the storybook build that is deployed to netlify

## Workflow for master branch
Here is a list of all steps that are handled by the various tools when merging to master. For technical details, please refer to the following files:
- `./.travis.yml`: travis configuration
- `./ci/`: scripts executed by travis jobs
- `.releaserc`: configuration for `semantic-release`

### Before merge
So you are ready to merge. Only if the following checks are passing, you're able to merge the pull request:
1. `Deep Code` analyzes the code
2. `Git Guardian` checks your code
3. `Snyk` checks all the dependencies for vulnerabilities
4. `Tracis CI` runs a build

### After merge
After you merge, Travis automatically starts it's job and runs the following steps:
1. Linting: The project is checked for Lining errors. If an error is found, the Travis job breaks.
2. Stencil components are build with `npm run build:stencil`. If the build breaks, the Travis job breaks.
3. Unit & e2e tests: all defined unit and e2e tests are executed. If any of the tests fails, the travis Job breaks.
4. Code coverage: The coverage report from the tests is uploaded to [Codecov](https://codecov.io/bash).
5. semantic-release: The `semantic-release` package analyzes all commit messages and determines the next version number, if any. Semantic-release is configured so that the new version number (if any), is written to the file `.version` on travis. If a new version was created:
  1. It will be published to npm.
  2. `CHANGELOG.md` will be updated and pushed back to the repo.
  3. A new github-tag with the new version number is created.
  4. The new version number gets updated in `package.json` and `package-lock.json` and pushed back to the repo.
  5. A slack message is send out according to the template defined in `.releaserc`
6. netlify-cli: the cli to work with netlify is installed.
7. Only if the `.version` file is found, storybook build will be made and the `storybook-static` folder will be deployed to netlify. We add the new version number as a title to the deployment.
8. Deployments page: with the information from all netlify deployments, a html-file with all production and preview deployments is generated and published on netlify
9. After all steps finished successfully, a slack message is send out according to the notifications-config in `.travis.yml`

## Workflow for branches other than master
This workflow is almost identical to the workflow for the master branch, except the following (keep in mind that the travis job runs everytime you push to your branch):
4. Code coverage report is not created
5. semantic-release is skipped
7. A deployment to netlify will be made in any case. In contrast to the master branch, these deployments are not labeled as production, but as deploy previews. The title of the deployment is the name of the branch.

The steps mentioned in "Before Merge" are only run if you have an open pull request for your branch.

## Travis configuration

### Job configuration

For the configuration of the Travis job, you can reference `./.travis.yml`.

### Environment variables

We need a couple of Environment variables on Travis:

- `CODECOV_TOKEN`: token to publish to codecov
- `GH_TOKEN`: github access token. Used to checkout the repo and push to the repo, updated tags, create versions etc... CAUTION: this token needs to be namend exactly like this so that semantic-release plugin can use it.
- `NETLIFY_AUTH_TOKEN`: netlify token to use deploy command on netlify-cli
- `NETLIFY_SITE_ID`: app id of the netlify site (lyne-components-storybook)
- `NETLIFY_SITE_ID_DEPLOYMENTS`: app id of the netlify site (lyne-components-deployments)
- `NPM_TOKEN`: npm access token to be able to publish to npm. CAUTION: this token needs to be namend exactly like this so that semantic-release plugin can use it.
- `SLACK_WEBHOOK`: token to be able to post messages on slack.

## Netlify configuration

### Create new Site
On netlify, you can click "New site from Git". But since we deploy from Travis to netlify, we don't need to use Git as a trigger for Netlify. Therefore, we need to setup a site with manual deploys. For that, you should first install the netlify-cli on your machine. After that, you can run `netlify deploy` and create a new Site with manual deploy. The Site id is used in the netlify deploy command.

### Access Token
An access token has to be generated on Netlify, so that Travis can deploy to Netlify. On Netlify, you cannot create an access token in the Webapp that can be used for netlify-cli. We must use the netlify-cli itself to create a token. For further details see here: (https://docs.netlify.com/cli/get-started/#obtain-a-token-via-the-command-line]. The token is used in the netlify deploy command.
