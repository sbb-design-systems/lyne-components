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
