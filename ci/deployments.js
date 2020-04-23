const shell = require('shelljs');
const argv = require('yargs').argv;
const axios = require('axios');
const fs = require('fs');

// env variables
const netlifyToken = argv.netlifyToken;
const netlifySiteId = argv.netlifySiteId;
const deploymentsDir = argv.deploymentsDir;

// general configuration
const config = {
  deploymentsJsonKeyDate: 'date',
  deploymentsJsonKeyPreview: 'preview',
  deploymentsJsonKeyProd: 'production',
  deploymentsJsonKeyTag: 'tag',
  deploymentsJsonKeyUrl: 'url',
  deploymentsJsonName: 'deployments.json',
  netlifyTitleSeparatorPreview: '++',
  netlifyTitleSeparatorProd: '::'
};

// prepare final JSON
const json = {};
json[config.deploymentsJsonKeyProd] = [];
json[config.deploymentsJsonKeyPreview] = [];

(async () => {

  const netlifyGetDeploysUrl = 'https://api.netlify.com/api/v1/sites/' + netlifySiteId + '/deploys' + '?access_token=' + netlifyToken;

  try {
    // get results
    const deployments = await axios.request({
      method: 'GET',
      url: netlifyGetDeploysUrl
    });

    if (!deployments.data) {
      console.log('-->> NETLIFY DEPLOYMENTS: no deployments received.');
      shell.exit(0);
    }

    if (deployments.data.length < 1) {
      console.log('-->> NETLIFY DEPLOYMENTS: no deployments received.');
      shell.exit(0);
    }

    // create an array of deployments with all needed data
    processDeploys(deployments.data);

    // write .json file
    fs.mkdirSync(deploymentsDir);
    fs.writeFileSync(`./${deploymentsDir}/${config.deploymentsJsonName}`, JSON.stringify(json));

    console.log(`-->> NETLIFY DEPLOYMENTS: Successfully created ${config.deploymentsJsonName}`);
    shell.exit(0);

  } catch (error) {
    console.log('-->> BUILD DEPLOYMENTS JSON: error');
    console.log(error);
    shell.exit(0);
  }
})();

// ---------------------------------------------------------------------------
// PROCESS DATA
// ---------------------------------------------------------------------------
const processDeploys = ((data) => {
  data.forEach((deploy) => {
    const deployType = getDeployType(deploy.title);

    if (deployType) {
      const deployTag = getDeployTag(deploy.title, deployType);

      if (deployTag.length < 1) {
        return;
      }

      const url = deploy.deploy_ssl_url;
      const date = deploy.created_at;

      // this is only relevant for branch deploys. but it does not hurt release
      // deploys, since we should never have 2 deploys with the same title
      const alreadyThere = findDeployment(deployTag, deployType);
      if (!alreadyThere) {
        const newDeploy = {};
        newDeploy[config.deploymentsJsonKeyTag] = deployTag;
        newDeploy[config.deploymentsJsonKeyDate] = date;
        newDeploy[config.deploymentsJsonKeyUrl] = url;
        json[deployType].push(newDeploy);
      }
    }
  });
});

const getDeployType = ((title) => {
  if (!title) {
    return false;
  }

  if (title.length < 1) {
    return false;
  }

  const prodSplit = title.split(config.netlifyTitleSeparatorProd);

  if (prodSplit.length === 3) {
    return config.deploymentsJsonKeyProd;
  }

  const previewSplit = title.split(config.netlifyTitleSeparatorPreview);

  if (previewSplit.length === 3) {
    return config.deploymentsJsonKeyPreview;
  }

  return false;
});

const findDeployment = ((deployTag, deployType) => {
  let resultFound = false;

  json[deployType].forEach((deployment) => {
    if (deployment[config.deploymentsJsonKeyTag] === deployTag) {
      resultFound = true;
      return;
    }
  });

  return resultFound;
});

const getDeployTag = ((titleString, type) => {
  const emptyTag = '';
  const isProd = type === config.deploymentsJsonKeyProd;
  const separator = isProd ? config.netlifyTitleSeparatorProd : config.netlifyTitleSeparatorPreview;

  if (!titleString) {
    return emptyTag;
  }

  if (titleString.length < 1) {
    return emptyTag;
  }

  const separatorSplits = titleString.split(separator);

  if (separatorSplits.length !== 3) {
    return emptyTag;
  }

  const tag = separatorSplits[1];

  if (isProd) {
    const splitByDots = tag.split('.');

    if (splitByDots.length !== 3) {
      return emptyTag;
    }
  } else {
    if (tag.length < 1) {
      return emptyTag;
    }
  }

  return tag;
});
