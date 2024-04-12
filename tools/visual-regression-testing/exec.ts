// This script serves as checking which OS visual regression testing is run
// and if it is not Linux, runs it in a container.

import { execSync, type ExecSyncOptionsWithStringEncoding } from 'child_process';
import { platform } from 'os';

import { startTestRunner } from '@web/test-runner';

const args = process.argv.slice(2);
if (platform() === 'linux' && !process.env.DEBUG) {
  startTestRunner();
} else {
  function executableIsAvailable(name: string): string | null {
    try {
      execSync(`${platform().startsWith('win') ? 'where' : 'which'} ${name}`, { encoding: 'utf8' });
      return name;
    } catch (error) {
      return null;
    }
  }

  const containerCmd = executableIsAvailable('docker') ?? executableIsAvailable('podman');
  if (!containerCmd) {
    console.log('Either docker or podman need to be installed!');
    process.exit(1);
  }

  const cwd = new URL('../../', import.meta.url);
  const tag = 'lyne-vrt';
  const branchName = execSync('git rev-parse --abbrev-ref HEAD');
  const execOptions: ExecSyncOptionsWithStringEncoding = {
    encoding: 'utf8',
    stdio: 'inherit',
    cwd,
  };
  execSync(
    `${containerCmd} build ` +
      '--file=tools/visual-regression-testing/testing.Dockerfile ' +
      //`--build-arg=VERSION=${readFileSync(new URL('../../.nvmrc', import.meta.url), 'utf8').replace('v', '')}` +
      `--tag=${tag} .`,
    execOptions,
  );
  console.log(`\nTest image ready\n`);
  execSync(
    `${containerCmd} run  -it --rm --ipc=host ` +
      `--env=BRANCH_NAME="${branchName}" ` +
      `--volume=./dist/screenshots:/dist/screenshots ` +
      `--entrypoint='["yarn", "wtr"${args.map((a) => `, "${a}"`).join('')}]' ` +
      tag,
    execOptions,
  );
}
