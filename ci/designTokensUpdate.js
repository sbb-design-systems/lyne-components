const getCommit = require('./getTravisCommit');
const shell = require('shelljs');
const simpleGit = require('simple-git');
const {
  argv
} = require('yargs');

const git = simpleGit();

// env variables
const {
  eventType,
  buildId
} = argv;

(async () => {
  try {

    if (eventType !== 'api') {
      console.log('-->> This is not an build triggered via API, therefore skipping update of lyne-design-tokens');
      shell.exit(0);
    }

    // install lyne design tokens
    shell.exec('npm install --save-dev lyne-design-tokens');

    // commit package.json
    const commitMessage = await getCommit(buildId);

    await git.add([
      'package.json',
      'package-lock.json'
    ]);

    await git.commit(`${commitMessage}`);

    console.log('-->> commitMessage:', commitMessage);

    shell.exit(0);
  } catch (e) {
    console.log('-->> Error while committing properties files.');
    console.log(e);

    shell.exit(1);
  }
})();
