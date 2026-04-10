import { existsSync, globSync } from 'node:fs';
import { join } from 'node:path';

import type { TestRunnerPlugin } from '@web/test-runner';
import { createServer, type ViteDevServer } from 'vite';

// Reference: https://github.com/remcovaes/web-test-runner-vite-plugin
export function vitePlugin(): TestRunnerPlugin {
  let viteServer: ViteDevServer;

  return {
    name: 'vite-plugin',

    async serverStart({ app, fileWatcher }) {
      const externals = [
        // @web/test-runner-commands needs to establish a web-socket
        // connection. It expects a file to be served from the
        // @web/dev-server. So it should be ignored by Vite.
        '/__web-dev-server__web-socket.js',
      ];
      const clientFiles = globSync('src/{elements,elements-experimental}/**/*.ts', {
        cwd: new URL('../../', import.meta.url),
        withFileTypes: true,
      })
        .filter((d) => d.isFile() && !d.name.endsWith('.stories.ts'))
        .map((d) => join(d.parentPath, d.name));

      viteServer = await createServer({
        clearScreen: false,
        // Disable hmr in favor of the @web/test-runner to take care of restarts.
        server: { middlewareMode: true, hmr: false, warmup: { clientFiles } },
        appType: 'custom',
        plugins: [
          {
            name: 'file-name',
            transform(_src, id) {
              const file = id.split('?')[0];
              if (!file.startsWith('\0') && existsSync(file)) {
                fileWatcher.add(file);
              }
            },
          },
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
        build: {
          cssMinify: 'esbuild',
          minify: true,
        },
      });
      app.use(
        (ctx, next) =>
          new Promise<void>((resolve, reject) => {
            viteServer.middlewares(ctx.req, ctx.res, (err?: unknown) => {
              if (err) {
                reject(err);
              } else {
                resolve(next());
              }
            });
          }),
      );
    },
    async serverStop() {
      return await viteServer.close();
    },
  };
}
