# Workflow

This is the workflow to generate `PREVIEWS.md` and `RELEASES.md`

## Working on a branch

- after pushing to the branch, travis starts building
- the script `./ci/build_preview_urls.sh` creates 2 files and pushes them back to the branch:
  1. `./ci/deployments.json`: a structured JSON-Object with information about all deployments (production & preview). This needed by the following steps
  2. `./PREVIEWS.md`: a list of branch names and their corresponding links to the netlify deployment

## Merging a PR into master

- after merging, travis starts building
- the script `./ci/build_production_urls.sh` creates 3 files and pushes them back to master:
  1. `./ci/deployments.json`: a structured JSON-Object with information about all deployments (production & preview). This needed by the following steps
  2. `./RELEASES.md`: a list of version numbers along with their corresponding links to the netlify deployment
  3. `./PREVIEWS.md`: a list of branch names and their corresponding links to the netlify deployment

## Details

1. `prepare_git.js`: is removing `PREVIEWS.md`, `RELEASES.md`, `releases.json`
2. `netlify_deploy_urls.js`: is creating `releases.json` containing all information about all deployments (production and deploy previews)
3. `build_deploy_urls.js`: is formating the input from `releases.json` and creates either `PREVIEWS.md` or `RELEASES.md` and pushes it to the repo
