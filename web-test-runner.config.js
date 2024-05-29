import { defaultReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import * as sass from 'sass';

import {
  minimalReporter,
  patchedSummaryReporter,
  ssrPlugin,
  visualRegressionConfig,
  vitePlugin,
} from './tools/web-test-runner/index.js';

const isCIEnvironment = !!process.env.CI || process.argv.includes('--ci');
const isDebugMode = process.argv.includes('--debug');
const allBrowsers = process.argv.includes('--all-browsers');
const firefox = process.argv.includes('--firefox');
const webkit = process.argv.includes('--webkit');
const concurrency = process.argv.includes('--parallel') ? {} : { concurrency: 1 };
const updateBaseImages =
  process.argv.includes('--update-visual-baseline') || process.argv.includes('--uv');
const visualRegressionRun =
  process.argv.includes('--group=visual-regression') ||
  (process.argv.includes('--group')
    ? process.argv[process.argv.indexOf('--group') + 1] === 'visual-regression'
    : false);

const stylesCompiler = new sass.initCompiler();
const renderStyles = () =>
  stylesCompiler.compile('./src/elements/core/styles/standard-theme.scss', {
    loadPaths: ['.', './node_modules/'],
  }).css;

const browsers =
  isCIEnvironment || allBrowsers
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
<html lang='en'>
  <head>
    <link
      rel="preload"
      href="https://cdn.app.sbb.ch/fonts/v1_6_subset/SBBWeb-Roman.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />
    <link
      rel="preload"
      href="https://cdn.app.sbb.ch/fonts/v1_6_subset/SBBWeb-Bold.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />
    <link
      rel="preload"
      href="https://cdn.app.sbb.ch/fonts/v1_6_subset/SBBWeb-Light.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />
    <style type="text/css">${renderStyles()}</style>
    <script>
      globalThis.testEnv = '${isDebugMode ? 'debug' : ''}';
      globalThis.testGroup = '${groupNameOverride ?? group?.name ?? 'default'}';
    </script>
  </head>
  <body class="sbb-disable-animation">
    <script type="module" src="/src/elements/core/testing/test-setup.ts"></script>
    <script type="module" src="${testFramework}"></script>
  </body>
</html>
`;

// A list of log messages, that should not be printed to the test console.
const suppressedLogs = [
  'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.',
  '[vite] connecting...',
];

const groups = [
  // Disable ssr tests until stabilized.
  // { name: 'e2e-ssr-hydrated', files: 'src/**/*.e2e.ts', testRunnerHtml },
  // { name: 'e2e-ssr-non-hydrated', files: 'src/**/*.e2e.ts', testRunnerHtml },
];

// The visual regression test group is only added when explicitly set, as the tests are very expensive.
if (visualRegressionRun) {
  groups.push({ name: 'visual-regression', files: 'src/**/*.snapshot.spec.ts', testRunnerHtml });
}

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  files: ['src/**/*.{e2e,spec,!snapshot.spec}.ts'],
  groups,
  nodeResolve: true,
  reporters:
    isDebugMode || !isCIEnvironment
      ? [defaultReporter(), patchedSummaryReporter()]
      : [minimalReporter()],
  browsers: browsers,
  plugins: [
    a11ySnapshotPlugin(),
    ssrPlugin(),
    vitePlugin(),
    visualRegressionPlugin(visualRegressionConfig(updateBaseImages)),
  ],
  testFramework: {
    config: {
      timeout: '10000',
      slow: '1000',
      failZero: true,
    },
  },
  coverageConfig: {
    exclude: ['**/node_modules/**/*', '**/assets/*.svg', '**/assets/*.png', '**/*.scss'],
  },
  filterBrowserLogs: (log) => !suppressedLogs.includes(log.args[0]),
  testRunnerHtml,
};
