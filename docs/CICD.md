# CI/CD

## SemVer

We adhere to the semantic versioning standard. With each merge into master, the potential next version is automatically determined by the `sematic-release` package.

Only commits that adhere to the `Conventional Commits` standard ([https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)) will trigger semantic releases accordingly.

To make sure developers properly style their commit messages, we use `husky` together with `commit-lint`.

## Tools

- [GitHub](https://github.com/lyne-design-system/lyne-components): Source code repository.
- [GitHub Actions](https://github.com/lyne-design-system/lyne-components/actions): CI & CD is done with GitHub Actions.
- [Netlify](https://app.netlify.com/): The storybook build and the deployments page are deployed to Netlify.
- [Codecov](https://codecov.io/bash): A report for code coverage is created for each release and uploaded to Codecov.
- [Deep Code](https://www.deepcode.ai/): analyzes the code
- [Git Guardian](https://gitguardian.com/): checks the code for security vulnerabilities
- [Snyk](https://snyk.io/): checks all the dependencies for vulnerabilities

## Artefacts

The following build artefacts are relevant for deployments:

- `./dist/components`: web components that are published to npm
- `./dist/react`: react components that are published to npm
- `./dist/storybook`: the storybook build that is deployed to chromatic and to preview environment
