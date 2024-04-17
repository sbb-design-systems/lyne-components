// This script checks which OS the visual regression testing is run on
// and if it is not Linux, runs it in a container.

import { execSync, type ExecSyncOptionsWithStringEncoding } from 'child_process';
import { mkdirSync } from 'fs';
import { platform } from 'os';

import { startTestRunner } from '@web/test-runner';

const args = process.argv.slice(2);
if ((platform() === 'linux' && !process.env.DEBUG) || process.env.FORCE_LOCAL) {
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

  const containerCmd = executableIsAvailable('podman') ?? executableIsAvailable('docker');
  if (!containerCmd) {
    console.log('Either docker or podman need to be installed!');
    process.exit(1);
  }

  const cwd = new URL('../../', import.meta.url);
  const tag = 'lyne-vrt';
  const execOptions: ExecSyncOptionsWithStringEncoding = {
    encoding: 'utf8',
    stdio: 'inherit',
    cwd,
  };
  execSync(
    `${containerCmd} build ` +
      '--file=tools/visual-regression-testing/testing.Dockerfile ' +
      `--tag=${tag} .`,
    execOptions,
  );
  console.log(`\nTest image ready\n`);
  mkdirSync(new URL('./dist/screenshots', cwd), { recursive: true });
  execSync(
    `${containerCmd} run  -it --rm --ipc=host ` +
      `--volume=./dist/screenshots:/dist/screenshots ` +
      `--entrypoint='["yarn", "wtr"${args.map((a) => `, "${a}"`).join('')}]' ` +
      tag,
    execOptions,
  );
}
