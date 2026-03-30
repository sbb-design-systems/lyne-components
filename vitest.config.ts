import { playwright } from '@vitest/browser-playwright';
import type { UserConfig } from 'vite';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

// TODO: split the test config into 2 projects (visual-regression and default)
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // include: ['src/**/*.spec.ts'],
      include: ['src/**/*.vitest.spec.ts'],
      exclude: ['src/**/*.snapshot.spec.ts', 'src/**/*.visual.spec.ts', 'src/**/*.ssr.spec.ts'],
      testTimeout: 10000,
      slowTestThreshold: 1000,
      setupFiles: ['./vitest.setup.ts'],
      attachmentsDir: './dist/.vitest-attachments',
      reporters: 'default', // TODO: see GITHUB_ACTIONS reporter
      browser: {
        provider: playwright(),
        enabled: true,
        headless: false,
        instances: [
          { browser: 'chromium' },
          // { browser: 'firefox' },
          // { browser: 'webkit' }
        ],
        testerHtmlPath: './vitest-tester.html',
        expect: {
          toMatchScreenshot: {
            comparatorName: 'pixelmatch',
            resolveScreenshotPath: ({ root, browserName, arg, ext }) =>
              `${root}/dist/vitest-screenshots/${browserName}/baseline/${arg}${ext}`,
            resolveDiffPath: ({ root, browserName, arg, ext }) =>
              `${root}/dist/vitest-screenshots/${browserName}/failed/${arg}${ext}`,
          },
        },
      },
    },
  } as UserConfig),
);
