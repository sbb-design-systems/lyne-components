# Release process

## Branch management

We use the `main` branch for development and major release.
The `3.x`, `4.x`, etc. branches are used to create minor and patch releases.
Every PR having the label `target: 3.x` will be cherry-picked on to the `3.x` branch and
will therefore be released with next `3.x` release.
Every PR with no `target:` label or `target: major` will remain on the `main` branch and
will therefore be released with the next major release.
As long as there is no detected `BREAKING CHANGE:` entry in a PR, the `target:` label of the
current active minor release branch will be added automatically. If adding a `BREAKING CHANGE:` entry at a later point,
the `target: 3.x` label will automatically be removed.
Breaking changes are only allowed for a major release or for the experimental package,
where breaking changes are allowed also in minor and patch releases.
Major releases are published twice a year.

## How to create a new release

We use [Release Please](https://github.com/googleapis/release-please) to automate the release process and
therefore have to comply with its rules.

### Preparation

#### Major release preparation

- Check TODOs, @breaking-change annotations and @deprecated annotations.
- GitHub maintenance workflow
  - Create new maintenance branch (e.g. 4.x).
  - Edit `TARGET_RELEASE` in `.github/workflows/maintenance-tagging-workflow.yml`.
  - Edit `baseBranches` property in `renovate.json` to activate renovate on new branch.

### Creating the release

1. Check the Release Please Pull Request and ensure all changes are correct and included.
2. Check if the version number is expected.

   If the release includes breaking changes for the experimental package but should be released with a minor version update,
   the version number has to be fixed manually with an empty commit, e.g. for releasing version `3.4.0`:
   `git commit --allow-empty -m "chore: fix release version to 3.4.0" -m "Release-As: 3.4.0"`.

3. Merge the Release Please Pull Request.
4. Check published packages and docs deployment.
5. Adapt potential changes to the Angular Wrapper and publish a new version of it if necessary.
