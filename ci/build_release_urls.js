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

const shell = require('shelljs');
const axios = require('axios');

axios.get('https://api.netlify.com/api/v1/sites/83d11a6b-364d-42da-831a-e0bd6997f954/deploys')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log('There was an error getting the data from netlify API!');
    console.log(error);
  });


// netlify api listSiteDeploys --data '{ "site_id": "83d11a6b-364d-42da-831a-e0bd6997f954"}'

/*
const shell = require('shelljs');
const report = require('./report.json');
const reportMeta = report['metadata'];
const vulnerabilities = reportMeta['vulnerabilities'];
const vulnerabilitiesHigh = vulnerabilities['high'];
const vulnerabilitiesCritical = vulnerabilities['critical'];

if (vulnerabilitiesHigh > 0 || vulnerabilitiesCritical > 0) {
  shell.echo(
    `-->> NPM AUDIT found ${vulnerabilitiesHigh} high vulnerabilities`
  );

  shell.echo(
    `-->> NPM AUDIT found ${vulnerabilitiesCritical} critical vulnerabilities`
  );

  shell.exit(1);
} else {
  shell.echo('-->> NPM AUDIT did not find any issues');
  shell.exit(0);
}
 */
