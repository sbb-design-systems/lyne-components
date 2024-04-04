import { existsSync } from 'fs';
import { createServer } from 'vite';

// Reference: https://github.com/remcovaes/web-test-runner-vite-plugin
export function vitePlugin() {
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
          noDiscovery: true,
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
