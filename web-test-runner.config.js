import { defaultReporter, summaryReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';
import postcssLit from 'rollup-plugin-postcss-lit';
import { existsSync } from 'fs';
import glob from 'glob';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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

const browsers = process.env.CI
  ? [
      playwrightLauncher({ product: 'chromium' }),
      playwrightLauncher({ product: 'firefox' }),
      playwrightLauncher({ product: 'webkit' }),
    ]
  : [
      // playwrightLauncher({
      //   product: 'chromium',
      //   launchOptions: { headless: true, devtools: true },
      // }),

      // In dev, we prefer to use puppeteer because has a better behavior in debug mode
      puppeteerLauncher({ concurrency: 1, launchOptions: { headless: 'new', devtools: true } }),
    ];

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
      plugins: postcssLit({
        exclude: '**/*.global.*',
      }),
    }),
  ],
};
