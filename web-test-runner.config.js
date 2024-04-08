import { defaultReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';
import * as sass from 'sass';
import { cpus } from 'node:os';

import {
  minimalReporter,
  patchedSummaryReporter,
  ssrPlugin,
  vitePlugin,
} from './tools/web-test-runner/index.js';

const isCIEnvironment = !!process.env.CI || process.argv.includes('--ci');
const isDebugMode = process.argv.includes('--debug');
const firefox = process.argv.includes('--firefox');
const webkit = process.argv.includes('--webkit');
const concurrency = process.argv.includes('--parallel') ? {} : { concurrency: 1 };

const globalCss = sass.compile('./src/components/core/styles/global.scss', {
  loadPaths: ['.', './node_modules/'],
});

const browsers = isCIEnvironment
  ? [
      // Parallelism has problems, we need force concurrency to 1
      playwrightLauncher({ product: 'chromium', ...concurrency }),
      playwrightLauncher({ product: 'firefox', ...concurrency }),
      playwrightLauncher({ product: 'webkit', ...concurrency }),
    ]
  : firefox
    ? [playwrightLauncher({ product: 'firefox' })]
    : webkit
      ? [playwrightLauncher({ product: 'webkit' })]
      : isDebugMode
        ? [
            puppeteerLauncher({
              launchOptions: { headless: false, devtools: true },
              ...concurrency,
            }),
          ]
        : [playwrightLauncher({ product: 'chromium' })];

const groupNameOverride = process.argv.includes('--ssr-hydrated')
  ? 'e2e-ssr-hydrated'
  : process.argv.includes('--ssr-non-hydrated')
    ? 'e2e-ssr-non-hydrated'
    : null;

const testRunnerHtml = (testFramework, _config, group) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="testEnvironment" ${isDebugMode ? 'debug' : ''}>
    <meta name="testGroup" content="${groupNameOverride ?? group?.name ?? 'default'}">
    <style type="text/css">${globalCss.css}</style>
  </head>
  <body>
    <script type="module" src="/src/components/core/testing/test-setup.ts"></script>
    <script type="module" src="${testFramework}"></script>
  </body>
</html>
`;

// Slow down fast cpus to not run into too much fetches
function resolveConcurrency() {
  const localCpus = cpus();
  const factor = localCpus.some((el) => el.model.includes('Apple M')) ? 4 : 2;
  return Math.floor(localCpus.length / factor);
}

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  files: ['src/**/*.{e2e,spec}.ts'],
  groups: [
    // Disable ssr tests until stabilized.
    // { name: 'e2e-ssr-hydrated', files: 'src/**/*.e2e.ts', testRunnerHtml },
    // { name: 'e2e-ssr-non-hydrated', files: 'src/**/*.e2e.ts', testRunnerHtml },
  ],
  nodeResolve: true,
  concurrency: resolveConcurrency(),
  reporters:
    isDebugMode || !isCIEnvironment
      ? [defaultReporter(), patchedSummaryReporter()]
      : [minimalReporter()],
  browsers: browsers,
  plugins: [a11ySnapshotPlugin(), ssrPlugin(), vitePlugin()],
  testFramework: {
    config: {
      timeout: '10000',
      slow: '1000',
      failZero: true,
    },
  },
  coverageConfig: {
    exclude: ['**/node_modules/**/*', '**/assets/*.svg', '**/*.scss'],
  },
  filterBrowserLogs: (log) =>
    log.args[0] !==
    'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.',
  testRunnerHtml,
};
