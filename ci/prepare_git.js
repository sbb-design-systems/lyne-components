const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const argv = require('yargs').argv;
const fs = require('fs');
const config = require('./deployments_config');

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

    await simpleGit.pull('origin', branch);

    // remove PREVIEWS.md
    await fs.access(`./${config.branchFileName}`, fs.F_OK, async (err) => {
      if (!err) {
        await simpleGit.rm([`${config.branchFileName}`]);
        await simpleGit.commit(`chore: remove ${config.branchFileName} [skip ci]`);
      }
    });


    // remove RELEASES.md
    if (isProdDeploy) {
      await fs.access(`./${config.prodFileName}`, fs.F_OK, async (err) => {
        if (!err) {
          await simpleGit.rm([`${config.prodFileName}`]);
          await simpleGit.commit(`chore: remove ${config.prodFileName} [skip ci]`);
        }
      });
    }

    // remove releases.json
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
