/**
 * This script is used by build_branch_urls.sh and build_release_urls.sh
 *
 * Purpose:
 * - make sure we are properly authenticated at git
 * - remove BRANCHES.md, DEPLOYMENTS.md and deployments.json files from git
 * to prevent potential merge conflicts.
 */

const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const argv = require('yargs').argv;
const fs = require('fs');
const config = require('./config');

const gitUser = argv.gitUser;
const gitToken = argv.gitToken;
const gitMail = argv.gitMail;
const branchName = argv.branch;
const isProdDeploy = argv.prod === 'true';

const gitUrl = `https://${gitUser}:${gitToken}@github.com/lyne-design-system/lyne-components`;
const branch = isProdDeploy ? 'master' : branchName;

(async () => {

  console.log('-->> PREPARE GIT: start');

  try {
    // make sure we are correctly authenticated at git.
    await simpleGit.removeRemote('origin');
    simpleGit.addConfig('user.email', gitMail);
    simpleGit.addConfig('user.name', gitUser);
    await simpleGit.addRemote('origin', gitUrl);
    await simpleGit.checkout(branch);

    // remove BRANCHES.md
    fs.access(`./${config.branchFileName}.md`, fs.F_OK, async (err) => {
      if (!err) {
        await simpleGit.rm([`${config.branchFileName}.md`]);
        await simpleGit.commit(`chore: remove ${config.branchFileName}.md [skip-ci]`);
      }
    });

    // remove DEPLOYMENTS.md
    if (isProdDeploy) {
      fs.access(`./${config.prodFileName}.md`, fs.F_OK, async (err) => {
        if (!err) {
          await simpleGit.rm([`${config.prodFileName}.md`]);
          await simpleGit.commit(`chore: remove ${config.prodFileName}.md [skip-ci]`);
        }
      });
    }

    // remove deployments.json
    fs.access(`./ci/${config.deploymentsJsonName}.json`, fs.F_OK, async (err) => {
      if (!err) {
        await simpleGit.rm([`${config.deploymentsJsonName}.json`]);
        await simpleGit.commit(`chore: remove ${config.deploymentsJsonName}.json [skip-ci]`);
      }
    });

    await simpleGit.push('origin', branch);

    console.log('-->> PREPARE GIT: successcull');
    shell.exit(0);

  } catch (error) {
    console.log('-->> PREPARE GIT: error');
    console.log(error);
    shell.exit(0);
  }
})();
