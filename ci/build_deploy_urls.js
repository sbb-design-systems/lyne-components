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

const simpleGit = require('simple-git/promise')('./');
const shell = require('shelljs');
const fs = require('fs');
const argv = require('yargs').argv;
const { promisify } = require("util");
const config = require('./config');

const gitUser = argv.gitUser;
const gitToken = argv.gitToken;
const gitMail = argv.gitMail;
const branchName = argv.branch;
const isProdDeploy = argv.prod === 'true';

const gitUrl = `https://${gitUser}:${gitToken}@github.com/lyne-design-system/lyne-components`;
const fileName = isProdDeploy ? config.prodFileName : config.branchFileName;
const branchFileName = 'BRANCHES';


(async () => {

  console.log('-->> BUILD DEPLOY URLS: start');

  try {

    // try to read deployments.json
    await fs.access(`./ci/${config.deploymentsJsonName}.json`, fs.F_OK, async (err) => {
      if (err) {
        console.log(`-->> BUILD DEPLOY URLS: ${config.deploymentsJsonName} not found`);
        shell.exit(0);
      }
    });

    const type = isProdDeploy ? config.deploymentsJsonKeyProd : config.deploymentsJsonKeyPreview;
    const rawFile = fs.readFileSync(`./ci/${config.deploymentsJsonName}.json`);
    const deployments = JSON.parse(rawFile)[type];

    // prepare content for .md file
    const formatedResults = formatResults(deployments);

    // write .md file
    const writeFile = promisify(fs.writeFile);
    await writeFile(`./${fileName}.md`, formatedResults);

    // commit and push .md file to git repo
    await pushToGit();

    console.log(`-->> BUILD DEPLOY URLS: successcully created ${fileName}.md and pushed to git repo`);
    shell.exit(0);

  } catch (error) {
    console.log('-->> BUILD DEPLOY URLS: error');
    console.log(error);
    shell.exit(0);
  }
})();

const formatResults = ((data) => {
  const prodDescription = '# Lyne Design System Releases\n\n THIS FILE IS AUTO-GENERATED, PLEASE DO NOT CHANGE IT MANUALLY \n\n';
  const branchDescription = '# Lyne Design System Deploy Previews\n\n THIS FILE IS AUTO-GENERATED, PLEASE DO NOT CHANGE IT MANUALLY \n\n';
  let fileData = isProdDeploy ? prodDescription : branchDescription;

  data.forEach((deployment) => {
    const deployTagString = isProdDeploy ? deployment[config.deploymentsJsonKeyTag] : `branch: [${config.deploymentsJsonKeyTag}](${config.gitBaseUrl + config.deploymentsJsonKeyTag})`;
    const date = formatDate(deployment[config.deploymentsJsonKeyDate]);

    fileData += `## ${deployTagString}\n`;
    fileData += `${date}\n\n`;
    fileData += `[${deployment[config.deploymentsJsonKeyUrl]}](${deployment[config.deploymentsJsonKeyUrl]})\n\n`;
  });

  return fileData;

});

const pushToGit = async () => {
  if (!isProdDeploy && !branchName) {
    return;
  }

  const prodCommit = `chore(release): update ${fileName}.md [skip ci]`;
  const branchCommit = `chore(deploypreview): update ${fileName}.md [skip ci]`;
  const commit = isProdDeploy ? prodCommit : branchCommit;
  const branch = isProdDeploy ? 'master' : branchName;

  await simpleGit.add(`${fileName}.md`);
  await simpleGit.commit(commit);
  await simpleGit.push(['-u', 'origin', branch]);
};

const formatDate = ((dateString) => {
  const dateObject = new Date(dateString);
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);

  return formattedDate;
});
