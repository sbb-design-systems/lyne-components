import { execSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { platform } from 'node:os';

import type { TestRunnerPlugin } from '@web/test-runner';

function executableIsAvailable(name: string): string | null {
  try {
    execSync(`${platform().startsWith('win') ? 'where' : 'which'} ${name}`, { encoding: 'utf8' });
    return name;
  } catch (error) {
    return null;
  }
}

const containerCmd =
  process.env.CONTAINER_CMD ?? executableIsAvailable('podman') ?? executableIsAvailable('docker');
const pkgJson = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));
const playwrightVersion = pkgJson.devDependencies.playwright;
const port = 3000;
export const playwrightWebsocketAddress = `ws://localhost:${port}`;
// See https://github.com/microsoft/playwright/issues/26482
export const startPlaywrightServerCommand = [
  containerCmd ?? 'docker',
  'run',
  '-p',
  `${port}:${port}`,
  '--rm',
  '--init',
  '--workdir=/home/pwuser',
  '--entrypoint=/bin/sh',
  `mcr.microsoft.com/playwright:v${playwrightVersion}-jammy`,
  `-c`,
  `npx -y playwright@${playwrightVersion} run-server --port ${port} --host 0.0.0.0`,
];

// Reference: https://github.com/remcovaes/web-test-runner-vite-plugin
export function containerPlaywrightBrowserPlugin(): TestRunnerPlugin {
  let abortController: AbortController;

  if (!containerCmd) {
    console.log('Either docker or podman need to be installed!');
    process.exit(1);
  }

  return {
    name: 'remote-playwright-browser-plugin',

    async serverStart({ logger }) {
      logger.log('Starting playwright browsers in a container');
      abortController = new AbortController();
      await new Promise<void>((resolve, reject) => {
        let id: NodeJS.Timeout | undefined = undefined;
        spawn(startPlaywrightServerCommand[0], startPlaywrightServerCommand.slice(1), {
          signal: abortController.signal,
        }).on('error', (err) => {
          clearInterval(id);
          reject(err);
        });
        id = setInterval(() => {
          const timeout = AbortSignal.timeout(950);
          const ws = new WebSocket(playwrightWebsocketAddress);
          timeout.addEventListener('abort', () => ws.close());
          ws.addEventListener(
            'open',
            () => {
              console.log('Playwright container is ready');
              ws.close();
              clearInterval(id);
              resolve();
            },
            { signal: timeout },
          );
        }, 1000);
        AbortSignal.timeout(60000).addEventListener('abort', () => {
          clearInterval(id);
          reject('Failed to start container');
        });
      });
    },
    async serverStop() {
      abortController.abort();
    },
  };
}
