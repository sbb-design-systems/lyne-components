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

    simpleGit().pull('origin', branch);

    // remove BRANCHES.md
    await fs.access(`./${config.branchFileName}`, fs.F_OK, async (err) => {
      if (!err) {
        await simpleGit.rm([`${config.branchFileName}`]);
        await simpleGit.commit(`chore: remove ${config.branchFileName} [skip ci]`);
      }
    });


    // remove DEPLOYMENTS.md
    if (isProdDeploy) {
      await fs.access(`./${config.prodFileName}`, fs.F_OK, async (err) => {
        if (!err) {
          await simpleGit.rm([`${config.prodFileName}`]);
          await simpleGit.commit(`chore: remove ${config.prodFileName} [skip ci]`);
        }
      });
    }

    // remove deployments.json
    await fs.access(`./ci/${config.deploymentsJsonName}`, fs.F_OK, async (err) => {
      if (!err) {
        await simpleGit.rm([`./ci/${config.deploymentsJsonName}`]);
        await simpleGit.commit(`chore: remove ${config.deploymentsJsonName} [skip ci]`);
      }
    });

    await simpleGit.push(['-u', 'origin', branch]);

    console.log('-->> PREPARE GIT: successcull');
    shell.exit(0);

  } catch (error) {
    console.log('-->> PREPARE GIT: error');
    console.log(error);
    shell.exit(0);
  }
})();
