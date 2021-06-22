const shell = require('shelljs');
const triggerTravis = require('lyne-helper-trigger-travis');
const {
  argv
} = require('yargs');

// env variables
const {
  travisToken
} = argv;

(async () => {
  try {
    await triggerTravis({
      branchName: 'main',
      message: 'triggered by lyne-components change',
      travisToken,
      travisUrl: 'https://api.travis-ci.com/repo/lyne-design-system%2Flyne-hydration-playground/requests'
    });

    console.log('-->> triggered build on lyne-hydration-playground');
    shell.exit(0);
  } catch (error) {
    console.log('-->> error while triggering build on lyne-hydration-playground');
    console.log(error);
    shell.exit(1);
  }

})();
