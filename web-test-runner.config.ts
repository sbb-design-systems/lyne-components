import { globSync } from 'node:fs';
import { platform } from 'node:os';
import { parseArgs } from 'node:util';

import { litSsrPlugin } from '@lit-labs/testing/web-test-runner-ssr-plugin.js';
import {
  defaultReporter,
  type TestRunnerConfig,
  type TestRunnerCoreConfig,
  type TestRunnerGroupConfig,
} from '@web/test-runner';
import {
  type PlaywrightLauncherArgs,
  playwrightLauncher,
  type PlaywrightLauncher,
} from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { initCompiler } from 'sass';

import {
  a11yTreePlugin,
  configureRemotePlaywrightBrowser,
  minimalReporter,
  patchedSummaryReporter,
  containerPlaywrightBrowserPlugin,
  visualRegressionConfig,
  vitePlugin,
  preloadIcons,
} from './tools/web-test-runner/index.ts';

const { values: cliArgs } = parseArgs({
  strict: false,
  options: {
    file: { type: 'string' },
    module: { type: 'string' },
    segment: { type: 'string' },
    ci: { type: 'boolean', default: !!process.env.CI },
    debug: { type: 'boolean' },
    'all-browsers': { type: 'boolean', short: 'a' },
    firefox: { type: 'boolean' },
    webkit: { type: 'boolean' },
    parallel: { type: 'boolean' },
    'update-visual-baseline': { type: 'boolean' },
    group: { type: 'string' },
    ssr: { type: 'boolean' },
    container: { type: 'boolean' },
    local: { type: 'boolean' },
    'visual-regression': { type: 'boolean' },
  },
});

const concurrency = cliArgs.parallel ? {} : { concurrency: 1 };
const launchOptions: PlaywrightLauncherArgs = {
  launchOptions: {
    ignoreDefaultArgs: ['--hide-scrollbars'],
    // Enables focusing links with tab on Firefox, probably only relevant on macOS.
    firefoxUserPrefs: { 'accessibility.tabfocus': 7 },
  },
};

const stylesCompiler = initCompiler();
const renderStyles = (): string =>
  stylesCompiler.compile('./src/elements/core/styles/standard-theme.scss', {
    loadPaths: ['.', './node_modules/'],
  }).css;

const browsers =
  cliArgs.ci || cliArgs['all-browsers']
    ? // Parallelism has problems, we need force concurrency to 1
      (['chromium', 'firefox', 'webkit'] as const).map((product) =>
        playwrightLauncher({
          product,
          createPage: ({ context }) =>
            context.newPage().then((page) => {
              page.on('console', (message) => {
                if (message.type() === 'error' && !message.location().url.includes('dummy.png')) {
                  console.error(`CONSOLE: ${product} ${page.url()}`);
                  console.error(message.location());
                  console.error(message.text());
                }
              });
              page.on('pageerror', (err) => {
                console.error(`PAGEERROR: ${product} ${page.url()}`);
                console.error(err);
              });
              return page;
            }),
          ...concurrency,
          ...launchOptions,
        }),
      )
    : cliArgs.firefox
      ? [playwrightLauncher({ product: 'firefox', ...launchOptions })]
      : cliArgs.webkit
        ? [playwrightLauncher({ product: 'webkit', ...launchOptions })]
        : [playwrightLauncher({ product: 'chromium', ...launchOptions })];

const preloadedIcons = await preloadIcons();

const testRunnerHtml = (
  testFramework: string,
  _config: TestRunnerCoreConfig,
  _group?: TestRunnerGroupConfig,
): string => `
<!DOCTYPE html>
<html lang="en">
  <head>${
    // Although we provide the fonts as base64, we preload the original
    // files which prevents a bug in Safari rendering special characters.
    ['Roman', 'Bold', 'Light']
      .map(
        (type) => `
    <link
      rel="preload"
      href="https://cdn.app.sbb.ch/fonts/v1_9_subset/SBBWeb-${type}.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous"
    />`,
      )
      .join('')
  }
    <link rel="modulepreload" href="/src/elements/core/testing/private/test-setup.ts" />
    <style type="text/css">
      ${renderStyles()}
    </style>
    <script type="module">
      globalThis.disableAnimation = true;
      globalThis.testEnv = '${cliArgs.debug ? 'debug' : ''}';
      globalThis.testGroup = '${cliArgs['visual-regression'] ? 'visual-regression' : 'default'}';
      globalThis.testRunScript = '${testFramework}';
    </script>
  </head>
  <body class="sbb-disable-animation">
    <div hidden>${preloadedIcons
      .map(
        (i) => `
    <template id="icon:${i.namespace}:${i.icon}">${i.svg}</template>`,
      )
      .join('')}</div>
    <script type="module" src="/src/elements/core/testing/private/test-setup.ts"></script>
  </body>
</html>
`;

// A list of log messages, that should not be printed to the test console.
const suppressedLogs = [
  'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.',
  '[vite] connecting...',
  '[vite] connected.',
  // TODO(major): Verify if still needed
  'Using <sbb-datepicker> with a native <input> is deprecated. Use a <sbb-date-input> instead of <input>.',
];

let testFiles = globSync(`src/**/*.spec.ts`);
// The visual regression test group is only added when explicitly set, as the tests are very expensive.
if (cliArgs['visual-regression']) {
  testFiles = testFiles.filter((f) => f.endsWith('.visual.spec.ts'));
  if (!cliArgs.local && platform() !== 'linux') {
    console.log(
      `Running visual regression tests in a non-linux environment. Switching to container usage. Use --local to opt-out.`,
    );
    cliArgs.container = true;
  }
} else {
  testFiles = testFiles.filter((f) => !f.endsWith('.visual.spec.ts'));
}

if (typeof cliArgs.file === 'string' && cliArgs.file) {
  testFiles = testFiles.filter((f) => f === cliArgs.file);
} else if (typeof cliArgs.module === 'string' && cliArgs.module) {
  testFiles = testFiles.filter((f) => f.includes(cliArgs.module as string));
} else if (typeof cliArgs.segment === 'string' && cliArgs.segment) {
  const match = cliArgs.segment.match(/^(\d+)\/(\d+)$/);
  if (!match) {
    throw new Error(
      `--segment parameter must be in the format index/total (e.g. 1/5), but received ${cliArgs.segment}`,
    );
  }

  const total = +match[2];
  const index = +match[1];
  const fileAmount = Math.ceil(testFiles.length / total);
  testFiles = testFiles.slice(fileAmount * (index - 1), fileAmount * index);
}

if (cliArgs.container) {
  browsers
    .filter((b): b is PlaywrightLauncher => b.type === 'playwright')
    .forEach((browser) => configureRemotePlaywrightBrowser(browser));
}

export default {
  files: testFiles,
  nodeResolve: true,
  reporters:
    cliArgs.debug || !cliArgs.ci
      ? [defaultReporter(), patchedSummaryReporter()]
      : [minimalReporter()],
  browsers: browsers,
  concurrentBrowsers: 3,
  plugins: [
    a11yTreePlugin(),
    litSsrPlugin({
      workerInitModules: [
        './tools/node-esm-hook/register-hooks.ts',
        './src/elements/core/testing/private/test-setup-ssr.ts',
      ],
    }),
    vitePlugin(),
    visualRegressionPlugin({
      ...visualRegressionConfig,
      update: !!cliArgs['update-visual-baseline'],
    }),
    ...(cliArgs.container ? [containerPlaywrightBrowserPlugin()] : []),
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
    reporters: cliArgs.ci ? ['json'] : undefined,
  },
  filterBrowserLogs: (log) => !suppressedLogs.includes(log.args[0]),
  testRunnerHtml,
  testsFinishTimeout: 180000,
} satisfies TestRunnerConfig;
