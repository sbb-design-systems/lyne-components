import { defaultReporter, summaryReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';
import { existsSync } from 'fs';
import glob from 'glob';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as sass from 'sass';

const isCIEnvironment = !!process.env.CI;
const isDebugMode = process.argv.includes('--debug');

const globalCss = sass.compile('./src/global/styles/global.scss', { loadPaths: ['.'] });

const specFiles = glob
  .sync('src/components/*/*.spec.ts', {
    cwd: dirname(fileURLToPath(import.meta.url)),
  })
  .filter((f) => existsSync(join(dirname(f), 'index.ts')));
const e2eFiles = glob
  .sync('src/components/*/*.e2e.ts', {
    cwd: dirname(fileURLToPath(import.meta.url)),
  })
  .filter((f) => existsSync(join(dirname(f), 'index.ts')));

const browsers = isCIEnvironment
  ? [
      playwrightLauncher({ product: 'chromium', concurrency: 1 }),
      playwrightLauncher({ product: 'firefox', concurrency: 1 }),
      playwrightLauncher({ product: 'webkit', concurrency: 1 }),
    ]
  : isDebugMode
  ? [puppeteerLauncher({ concurrency: 1, launchOptions: { headless: false, devtools: true } })]
  : [playwrightLauncher({ product: 'chromium' })];

// TODO: Revert to glob rules after migration
export default {
  files: [...specFiles, ...e2eFiles], // the global folder is temporary excluded until we migrate test
  groups: [
    { name: 'spec', files: specFiles },
    { name: 'e2e', files: e2eFiles },
  ],
  nodeResolve: true,
  reporters: [defaultReporter(), summaryReporter()],
  browsers: browsers,
  plugins: [
    vitePlugin({
      // This configuration is necessary, as vite will otherwise detect dependencies
      // that can be optimized. This will cause vite to reload, which leads to
      // 'Could not import your test module.' errors, that happen randomly.
      // Excluding the dependencies, prevents this from happening at the cost of slightly
      // increased test times.
      optimizeDeps: {
        exclude: [
          '@storybook/testing-library',
          '@web/test-runner-commands',
          'lit',
          'lit/directives/*.js',
        ],
      },
    }),
  ],
  testFramework: {
    config: {
      timeout: '3000',
      slow: '1000',
      failZero: true,
    },
  },
  testRunnerHtml: (testFramework) => `
    <html>
      <head>
        <style type="text/css">${globalCss.css}</style>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
        <script type="module" src="/src/global/testing/test-setup.ts"></script>
      </body>
    </html>
  `,
};
