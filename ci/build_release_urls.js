/**
 * This file is used as a script in package.json. The script is called
 * in .travis.yml
 */

/**
 * Purpose:
 *
 * When deploying to netlify, the release number is sent as title along
 * with the deployment. We use this to create a list with releases and links
 * to the according deployments on netlify.
 */

/**
 * Process:
 * 1. script makes a call to the netlify api to get all deployments
 * 2. it iterates over all deployments and creates an object with all
 * releases and deploy-urls
 * 3. it writes the releases and deploy urls to a .md file
 * 4. it pushes the .md file to our repo
 */

const axios = require('axios');
const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const fs = require('fs');
const argv = require('yargs').argv;
const { promisify } = require("util");

const netlifyToken = argv.netlifyToken;
const netlifySiteId = argv.netlifySiteId;
const netlifyGetDeploysUrl = 'https://api.netlify.com/api/v1/sites/' + netlifySiteId + '/deploys' + '?access_token=' + netlifyToken;
const gitUser = argv.gitUser;
const gitToken = argv.gitToken;
const gitMail = argv.gitMail;
const gitUrl = `https://${gitUser}:${gitToken}@github.com/lyne-design-system/lyne-components`;

(async () => {

  try {

    // get results
    const deployments = await axios.request({
      method: "GET",
      url: netlifyGetDeploysUrl
    });

    if (!deployments.data) {
      throw new Error('-->> BUILD RELEASE URLS: no deployments received.');
    }

    if (deployments.data.length < 1) {
      throw new Error('-->> BUILD RELEASE URLS: no deployments received.');
    }

    // create an array of deployments with all needed data
    const results = processDeploys(deployments.data);

    if (results.length < 1) {
      throw new Error('-->> BUILD RELEASE URLS: no deployments with valid version number received.');
    }

    // prepare content for .md file
    const formatedResults = formatResults(results);

    // write .md file
    const writeFile = promisify(fs.writeFile);
    await writeFile('./DEPLOYMENTS.md', formatedResults)

    // commit and push .md file to git repo
    await pushToGit();

    console.log('-->> BUILD RELEASE URLS: successcully created DEPLOYMENTS.md and pushed to git repo');
    shell.exit(0);

  } catch (error) {
    console.log('-->> BUILD RELEASE URLS: error');
    console.log(error);
    shell.exit(0);
  }
})();

// ---------------------------------------------------------------------------
// PROCESS DATA
// ---------------------------------------------------------------------------
const processDeploys = ((data) => {
  const results = [];

  data.forEach((deploy) => {
    const versionNumber = getVersionNumber(deploy.title);

    if (versionNumber.length < 1) {
      return;
    }

    const url = deploy.deploy_ssl_url;
    const date = formatDate(deploy.created_at);

    results.push({
      version: versionNumber,
      url: url,
      date: date
    });
  });

  return results;
});

const formatResults = ((data) => {
  let fileData = '# Lyne Design System Releases\n\n THIS FILE IS AUTO-GENERATED, PLEASE DO NOT CHANGE IT MANUALLY \n\n';

  data.forEach((deployment) => {
    fileData += `## ${deployment.version}\n`;
    fileData += `${deployment.date}\n\n`;
    fileData += `${deployment.url}\n\n`
  });

  return fileData;
});

// ---------------------------------------------------------------------------
// PUSH TO GIT
// ---------------------------------------------------------------------------
const pushToGit = async () => {
  await simpleGit.removeRemote('origin');
  simpleGit.addConfig('user.email', gitMail);
  simpleGit.addConfig('user.name', gitUser);
  await simpleGit.addRemote('origin', gitUrl);
  await simpleGit.checkout('master');
  await simpleGit.pull('origin', 'master');
  await simpleGit.add('DEPLOYMENTS.md');
  await simpleGit.commit('chore(release): update DEPLOYMENTS.md [skip ci]');
  await simpleGit.push(['-u', 'origin', 'master']);
};

// ---------------------------------------------------------------------------
// HELPER METHODS
// ---------------------------------------------------------------------------
const getVersionNumber = ((titleString) => {
  const emptyVersion = '';

  if (!titleString) {
    return emptyVersion;
  }

  if (titleString.length < 1) {
    return emptyVersion;
  }

  const separatorSplits = titleString.split('::');

  if (separatorSplits.length !== 3) {
    return emptyVersion;
  }

  const versionNumber = separatorSplits[1];
  const splitByDots = versionNumber.split('.');

  if (splitByDots.length !== 3) {
    return emptyVersion;
  }

  return versionNumber;
});

const formatDate = ((dateString) => {
  const dateObject = new Date(dateString);
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);

  return formattedDate;
});
