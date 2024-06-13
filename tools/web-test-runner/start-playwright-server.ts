import { spawn } from 'node:child_process';

import { startPlaywrightServerCommand } from './container-playwright-browser-plugin.js';

const abortController = new AbortController();
spawn(startPlaywrightServerCommand[0], startPlaywrightServerCommand.slice(1), {
  stdio: 'inherit',
  signal: abortController.signal,
});

process.on('SIGINT', () => {
  abortController.abort();
  process.exit(0);
});
