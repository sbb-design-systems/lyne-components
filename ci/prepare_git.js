/**
 * This script is used by travis.yml
 *
 * Purpose:
 * - make sure we are properly authenticated at git
 * - remove BRANCHES.md and DEPLOYMENTS.md files from git to prevent
 * potential merge conflicts.
 */

const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const argv = require('yargs').argv;
const fs = require('fs');
const config = require('./config');

const gitUser = argv.gitUser;
const gitToken = argv.gitToken;
const gitMail = argv.gitMail;

const gitUrl = `https://${gitUser}:${gitToken}@github.com/lyne-design-system/lyne-components`;
const branchName = argv.branch;
const isProdDeploy = argv.prod;
const branch = isProdDeploy ? 'master' : branchName;

(async () => {

  try {
    // make sure we are correctly authenticated at git.
    await simpleGit.removeRemote('origin');
    simpleGit.addConfig('user.email', gitMail);
    simpleGit.addConfig('user.name', gitUser);
    await simpleGit.addRemote('origin', gitUrl);
    await simpleGit.checkout(branch);

    // remove the relevant files.
    fs.access(`./${config.branchFileName}.md`, fs.F_OK, async (err) => {
      if (!err) {
        console.log('found file');
        await simpleGit.rm([`${config.branchFileName}.md`]);
        await simpleGit.commit(`chore: remove ${config.branchFileName}.md [skip-ci]`);
      } else {
        console.log('not ound file');
      }
    });

    if (isProdDeploy) {
      fs.access(`./${config.prodFileName}.md`, fs.F_OK, async (err) => {
        if (!err) {
          await simpleGit.rm([`${config.prodFileName}.md`]);
          await simpleGit.commit(`chore: remove ${config.prodFileName}.md [skip-ci]`);
        }
      });
    }

    await simpleGit.push('origin', branch);

    console.log('-->> PREPARE GIT: successcull');
    shell.exit(0);

  } catch (error) {
    console.log('-->> PREPARE GIT: error');
    console.log(error);
    shell.exit(0);
  }
})();
