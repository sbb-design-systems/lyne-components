import { defaultReporter, summaryReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { existsSync } from 'fs';
import * as glob from 'glob';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as sass from 'sass';
import { createServer } from 'vite';

const isCIEnvironment = !!process.env.CI || process.argv.includes('--ci');
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
  plugins: [vitePlugin()],
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
        <script type="module" src="/src/global/testing/test-setup.ts"></script>
      </body>
    </html>
  `,
};

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
