import { defaultReporter, dotReporter, summaryReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';
import { existsSync } from 'fs';
import * as sass from 'sass';
import { createServer } from 'vite';

const isCIEnvironment = !!process.env.CI || process.argv.includes('--ci');
const isDebugMode = process.argv.includes('--debug');

const globalCss = sass.compile('./src/components/core/styles/global.scss', { loadPaths: ['.'] });

const browsers = isCIEnvironment
  ? [
      // Parallelism has problems, we need force concurrency to 1
      playwrightLauncher({ product: 'chromium', concurrency: 1 }),
      playwrightLauncher({ product: 'firefox', concurrency: 1 }),
      playwrightLauncher({ product: 'webkit', concurrency: 1 }),
    ]
  : isDebugMode
    ? [puppeteerLauncher({ concurrency: 1, launchOptions: { headless: false, devtools: true } })]
    : [playwrightLauncher({ product: 'chromium' })];

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  files: ['src/**/*.{e2e,spec}.ts'],
  groups: [
    { name: 'spec', files: 'src/**/*.spec.ts' },
    { name: 'e2e', files: 'src/**/*.e2e.ts' },
  ],
  nodeResolve: true,
  reporters: isDebugMode ? [defaultReporter(), summaryReporter()] : [minimalReporter()],
  browsers: browsers,
  plugins: [vitePlugin(), a11ySnapshotPlugin()],
  testFramework: {
    config: {
      timeout: '3000',
      slow: '1000',
      failZero: true,
    },
  },
  filterBrowserLogs: (log) =>
    log.args[0] !==
    'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.',
  testRunnerHtml: (testFramework) => `
    <html>
      <head>
        <style type="text/css">${globalCss.css}</style>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
        <script type="module" src="/src/components/core/testing/test-setup.ts"></script>
      </body>
    </html>
  `,
};

/** @type {import('@web/test-runner-core').Reporter} */
function minimalReporter() {
  const base = dotReporter();
  const log = (result) => process.stdout.write(result.passed ? '.' : '\x1b[31mx\x1b[0m');
  function logResults(results) {
    results?.tests?.forEach(log);
    results?.suites?.forEach(logResults);
  }
  const collectorBase = { suites: 0, tests: 0, passed: 0, failed: 0, skipped: 0 };
  /** @param {import('@web/test-runner-core').TestSession[]} sessions */
  function aggregateSessions(sessions) {
    const browserResults = new Map();
    for (const session of sessions) {
      if (!browserResults.has(session.browser.name)) {
        browserResults.set(session.browser.name, { ...collectorBase });
      }
      aggregateSuites(session.testResults, browserResults.get(session.browser.name));
    }
    return Array.from(browserResults).sort((a, b) => a[0].localeCompare(b[0]));
  }
  /** @param {import('@web/test-runner-core').TestSuiteResult} results */
  function aggregateSuites(results, collector = { ...collectorBase }) {
    collector.suites += 1;
    results?.tests?.forEach((result) => {
      collector.tests += 1;
      if (result.passed) {
        collector.passed += 1;
      } else if (result.skipped) {
        collector.skipped += 1;
      } else {
        collector.failed += 1;
      }
    });
    results?.suites?.forEach((s) => aggregateSuites(s, collector));
    return collector;
  }
  const p = (v) => v.toString().padStart(6, ' ');

  return {
    ...base,
    reportTestFileResults({ sessionsForTestFile: sessions }) {
      for (const session of sessions) {
        logResults(session.testResults);
      }
    },
    /** @param {import('@web/test-runner-core').TestRunFinishedArgs} args */
    onTestRunFinished(args) {
      const browserResults = aggregateSessions(args.sessions);
      console.log('');
      console.group('Test Summary:');
      for (const [browser, collector] of browserResults) {
        console.group(browser);
        console.log(`Suites:  ${p(collector.suites)}`);
        console.log(`Tests:   ${p(collector.tests)}`);
        console.log(`Passed:  ${p(collector.passed)}`);
        console.log(`Failed:  ${p(collector.failed)}`);
        console.log(`Skipped: ${p(collector.skipped)}`);
        console.groupEnd();
      }
      console.groupEnd();
      base.onTestRunFinished(args);
    },
  };
}

// Reference: https://github.com/remcovaes/web-test-runner-vite-plugin
function vitePlugin() {
  let viteServer;

  return {
    name: 'vite-plugin',

    async serverStart({ app, fileWatcher }) {
      const externals = [
        // @web/test-runner-commands needs to establish a web-socket
        // connection. It expects a file to be served from the
        // @web/dev-server. So it should be ignored by Vite.
        '/__web-dev-server__web-socket.js',
      ];

      viteServer = await createServer({
        clearScreen: false,
        plugins: [
          {
            name: 'file-name',
            transform(_src, id) {
              const file = id.split('?')[0];
              if (!file.startsWith('\0') && existsSync(file)) {
                fileWatcher.add(id);
              }
            },
          },
          {
            name: 'mark-external',
            resolveId: (id) => (externals.includes(id) ? { id, external: true } : undefined),
          },
        ],
        // Disable hmr in favor of the @web/test-runner to take care of restarts.
        server: { hmr: false },
        // This configuration is necessary, as vite will otherwise detect dependencies
        // that can be optimized. This will cause vite to reload, which leads to
        // 'Could not import your test module.' errors, that happen randomly.
        // Excluding the dependencies, prevents this from happening at the cost of slightly
        // increased test times.
        optimizeDeps: {
          disabled: true,
        },
      });
      await viteServer.listen();

      const vitePort = viteServer.config.server.port;
      const viteProtocol = viteServer.config.server.https ? 'https' : 'http';

      app.use(async (ctx) => {
        const response = await fetch(`${viteProtocol}://localhost:${vitePort}${ctx.originalUrl}`);
        ctx.set(Object.fromEntries(response.headers));
        ctx.body = await response.text();
        ctx.status = response.status;
      });
    },
    async serverStop() {
      return await viteServer.close();
    },
  };
}
