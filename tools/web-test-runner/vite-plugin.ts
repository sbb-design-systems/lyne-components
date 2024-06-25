import type { TestRunnerPlugin } from '@web/test-runner';
import c2k from 'koa-connect';
import { createServer, type ViteDevServer } from 'vite';

// Reference: https://github.com/remcovaes/web-test-runner-vite-plugin
export function vitePlugin(): TestRunnerPlugin {
  let viteServer: ViteDevServer;

  return {
    name: 'vite-plugin',

    async serverStart({ app }) {
      const externals = [
        // @web/test-runner-commands needs to establish a web-socket
        // connection. It expects a file to be served from the
        // @web/dev-server. So it should be ignored by Vite.
        '/__web-dev-server__web-socket.js',
      ];

      viteServer = await createServer({
        clearScreen: false,
        // Disable hmr in favor of the @web/test-runner to take care of restarts.
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
        plugins: [
          {
            name: 'mark-external',
            resolveId: (id) => (externals.includes(id) ? { id, external: true } : undefined),
          },
        ],
        // This configuration is necessary, as vite will otherwise detect dependencies
        // that can be optimized. This will cause vite to reload, which leads to
        // 'Could not import your test module.' errors, that happen randomly.
        // Disabling discovery prevents this from happening at the cost of slightly
        // increased test times.
        optimizeDeps: {
          noDiscovery: true,
        },
      });
      app.use(c2k(viteServer.middlewares));
    },
    async serverStop() {
      return await viteServer.close();
    },
  };
}
