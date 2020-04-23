const shell = require('shelljs');
const argv = require('yargs').argv;
const netlifyDeployments = require('./netlify_deployments');
const buildDeployUrls = require('./build_deploy_urls');

const netlifyToken = argv.netlifyToken;
const netlifySiteId = argv.netlifySiteId;
const deploymentsDir = argv.deploymentsDir;

(async () => {
  try {
    await netlifyDeployments(netlifyToken, netlifySiteId, deploymentsDir);
    // await buildDeployUrls(deploymentsDir);
    console.log('-->> BUILD DEPLOYMENTS JSON: success');
    shell.exit(0);
  } catch (error) {
    console.log('-->> BUILD DEPLOYMENTS JSON: error');
    console.log(error);
    shell.exit(0);
  }
})();
