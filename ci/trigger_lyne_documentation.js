const argv = require('minimist');
const shell = require('shelljs');
const triggerTravis = require('lyne-helper-trigger-travis');

(async () => {
  console.log('-->> trigger build on lyne-documentation');

  const token = argv(process.argv.slice(2))['t'];

  await triggerTravis({
    branchName: 'master',
    message: 'triggered by lyne-components change',
    travisToken: token,
    travisUrl: 'https://api.travis-ci.org/repo/lyne-design-system%2Flyne-components/requests'
  });

  shell.exit(0);
})();
