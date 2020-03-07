/**
 * This file is used as a script in package.json. The script is called
 * in .travis.yml
 */

/**
 * Purpose:
 *
 * When deploying to netlify, the release number is send as title along
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
const simpleGit = require('simple-git')('./');
const shell = require('shelljs');
const fs = require('fs');
const argv = require('yargs').argv;

const netlifyToken = argv.netlifyToken;
const netlifySiteId = argv.netlifySiteId;
const netlifyGetDeploysUrl = 'https://api.netlify.com/api/v1/sites/' + netlifySiteId + '/deploys' + '?access_token=' + netlifyToken;
const gitUser = argv.gitUser;
const gitToken = argv.gitToken;
const gitMail = argv.gitMail;
const gitUrl = `https://${gitUser}:${gitToken}@github.com/lyne-design-system/lyne-components`;

// ---------------------------------------------------------------------------
// CALL API
// ---------------------------------------------------------------------------
axios.request({
  method: "GET",
  url: netlifyGetDeploysUrl
}).then(response => {
  if (!response.data) {
    console.log('-->> ! BUILD RELEASE URLS: There are no deployments...');
    shell.exit(0);
    return;
  }

  console.log('-->> BUILD RELEASE URLS: response received from netlify');
  const results = processDeploys(response.data);
  const formatedResults = formatResults(results);
  writeResultsToFile(formatedResults);

}).catch(error => {
  console.log('-->> ! BUILD RELEASE URLS: There was an error getting or parsing the results from netlify api');
  console.log(error);
  shell.exit(0);
});

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
  let fileData = '# Lyne Design System Releases\n\n THIS FILE IS AUTO-GENERATED \n\n';

  data.forEach((deployment) => {
    fileData += `## ${deployment.version}\n`;
    fileData += `${deployment.date}\n\n`;
    fileData += `${deployment.url}\n\n`
  });

  return fileData;
});

// ---------------------------------------------------------------------------
// WRITE DATA TO FILE
// ---------------------------------------------------------------------------
const writeResultsToFile = ((results) => {

  if (results.length < 1) {
    console.log('-->> ! BUILD RELEASE URLS: There are no deployments with valid version numbers');
    shell.exit(0);
    return;
  }

  console.log('-->> BUILD RELEASE URLS: data is prepared and ready to be saved');

  fs.writeFile("./DEPLOYMENTS.md", results, function(error) {
    if(error) {
      console.log('-->> ! BUILD RELEASE URLS: Error writing the file');
      console.log(error);
      shell.exit(0);
      return;
    }

    console.log('-->> BUILD RELEASE URLS: data saved to file');

    pushToGit();

  });

});

// ---------------------------------------------------------------------------
// PUSH TO GIT
// ---------------------------------------------------------------------------
const pushToGit = (() => {

  simpleGit.removeRemote('origin', (err) => {
    if (err) {
      console.log('-->> ! BUILD RELEASE URLS: Error removing git remote');
      console.log(err);
      shell.exit(0);
      return;
    }

    simpleGit.addConfig('user.email', gitMail);
    simpleGit.addConfig('user.name', gitUser);

    simpleGit.addRemote('origin', gitUrl, (err) => {
      if (err) {
        console.log('-->> ! BUILD RELEASE URLS: Error adding git remote');
        console.log(err);
        shell.exit(0);
        return;
      }

      simpleGit.checkout('master', (err) => {
        if (err) {
          console.log('-->> ! BUILD RELEASE URLS: Error checking out the master branch');
          console.log(err);
          shell.exit(0);
          return;
        }

        simpleGit.pull('origin', 'master', (err) => {
          if (err) {
            console.log('-->> ! BUILD RELEASE URLS: Error pulling latest changes');
            console.log(err);
            shell.exit(0);
            return;
          }

          simpleGit.add('DEPLOYMENTS.md', (err) => {
            if (err) {
              console.log('-->> ! BUILD RELEASE URLS: Error adding DEPLOYMENTS.md file');
              console.log(err);
              shell.exit(0);
              return;
            }

            simpleGit.commit('chore(release): update DEPLOYMENTS.md [skip ci]', function(err) {
              if (err) {
                console.log('-->> ! BUILD RELEASE URLS: Error making commit');
                console.log(err);
                shell.exit(0);
                return;
              }

              simpleGit.push(['-u', 'origin', 'master'], (err) => {
                if (err) {
                  console.log('-->> ! BUILD RELEASE URLS: Error pushing to master');
                  console.log(err);
                  shell.exit(0);
                  return;
                }

                console.log('-->> BUILD RELEASE URLS: push finished');
                shell.exit(0);
              });
            });
          });
        });
      });
    });
  });
});

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
