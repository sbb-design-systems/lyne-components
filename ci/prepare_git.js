const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const argv = require('yargs').argv;

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

    // checkout and pull the specific branch
    await simpleGit.checkout(branch);
    await simpleGit.pull('origin', branch);

    console.log('-->> PREPARE GIT: successcull');
    shell.exit(0);

  } catch (error) {
    console.log('-->> PREPARE GIT: error');
    console.log(error);
    shell.exit(0);
  }
})();
