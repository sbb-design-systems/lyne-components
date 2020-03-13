/**
 * The script is called in shell scripts via .travis.yml
 */

/**
 * Purpose:
 *
 *
 * When deploying to netlify, the release number (if no --branch is specified) or the
 * branch-url (if --branch is defined) is sent as title along with the deployment.
 * a: For releases, we create DEPLOYMENTS.md with a list of releases and urls
 * to the deployments on netlify
 * b: For branch builds, we create BRANCHES.md with a list of branch-urls to
 * github along with links to deploy previews on netlify
 */

/**
 * Process:
 * 1. script makes a call to the netlify api to get all deployments
 * 2. it iterates over all deployments and creates an object with all
 * releases/branch-url's and deploy-urls
 * 3. these contents are written to the corresponding .md file
 * 4. it pushes the .md file to our repo
 */

const axios = require('axios');
const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const fs = require('fs');
const argv = require('yargs').argv;
const { promisify } = require("util");

// If undefined, a prod deployment will be made
const branchName = argv.branch;
const isProdDeploy = branchName === undefined;

const netlifyToken = argv.netlifyToken;
const netlifySiteId = argv.netlifySiteId;
const netlifyGetDeploysUrl = 'https://api.netlify.com/api/v1/sites/' + netlifySiteId + '/deploys' + '?access_token=' + netlifyToken;
const gitUser = argv.gitUser;
const gitToken = argv.gitToken;
const gitMail = argv.gitMail;
const gitUrl = `https://${gitUser}:${gitToken}@github.com/lyne-design-system/lyne-components`;

const prodFileName = 'DEPLOYMENT';
const branchFileName = 'BRANCHES';
const prodCommit = `chore(release): update ${prodFileName}.md [skip ci]`;
const branchCommit = `chore(deploypreview): update ${branchFileName}.md [skip ci]`;
const prodDescription = '# Lyne Design System Releases\n\n THIS FILE IS AUTO-GENERATED, PLEASE DO NOT CHANGE IT MANUALLY \n\n';
const branchDescription = '# Lyne Design System Deploy Previews\n\n THIS FILE IS AUTO-GENERATED, PLEASE DO NOT CHANGE IT MANUALLY \n\n';
const config = {
  branch: isProdDeploy ? 'master' : branchName,
  targetFileName: isProdDeploy ? 'DEPLOYMENT' : 'BRANCHES',
  tagSeparator: isProdDeploy ? '::' : '++',
  commit: isProdDeploy ? prodCommit : branchCommit,
  fileDescription: isProdDeploy ? prodDescription : branchDescription
};

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
    await writeFile(`./${config.targetFileName}.md`, formatedResults)

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
    const deployTag = getDeployTag(deploy.title);

    if (deployTag.length < 1) {
      return;
    }

    const url = deploy.deploy_ssl_url;
    const date = formatDate(deploy.created_at);

    results.push({
      deployTag: deployTag,
      url: url,
      date: date
    });
  });

  return results;
});

const formatResults = ((data) => {
  let fileData = config.fileDescription;

  data.forEach((deployment) => {
    fileData += `## ${deployment.deployTag}\n`;
    fileData += `${deployment.date}\n\n`;
    fileData += `[${deployment.url}](${deployment.url})\n\n`;
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
  await simpleGit.checkout(config.branch);
  await simpleGit.pull('origin', config.branch);
  await simpleGit.add(`${config.targetFileName}.md`);
  await simpleGit.commit(config.commit);
  await simpleGit.push(['-u', 'origin', config.branch]);
};

// ---------------------------------------------------------------------------
// HELPER METHODS
// ---------------------------------------------------------------------------
const getDeployTag = ((titleString) => {
  const emptyTag = '';

  if (!titleString) {
    return emptyTag;
  }

  if (titleString.length < 1) {
    return emptyTag;
  }

  const separatorSplits = titleString.split(config.tagSeparator);

  if (separatorSplits.length !== 3) {
    return emptyTag;
  }

  const tag = separatorSplits[1];

  if (isProdDeploy) {
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

const formatDate = ((dateString) => {
  const dateObject = new Date(dateString);
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);

  return formattedDate;
});
