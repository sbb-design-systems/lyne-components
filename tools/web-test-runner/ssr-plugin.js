import { Worker } from 'worker_threads';

// Reference: https://github.com/lit/lit/blob/main/packages/labs/testing/src/lib/lit-ssr-plugin.ts
// This is necessary until https://github.com/privatenumber/tsx/issues/354 is fixed
export function ssrPlugin() {
  const litSsrPluginCommand = 'lit-ssr-render';

  return {
    name: 'ssr-plugin',
    async executeCommand({ command, payload }) {
      if (command !== litSsrPluginCommand) {
        return undefined;
      } else if (!payload) {
        throw new Error(`Missing payload for ${litSsrPluginCommand} command`);
      }

      const { template, modules } = payload;
      const resolvedModules = modules.map((m) => new URL(`.${m}`, import.meta.url).pathname);
      return new Promise((resolve, reject) =>
        new Worker(new URL('./lit-ssr-worker.js', import.meta.url), {
          workerData: { template, modules: resolvedModules },
        })
          .on('error', reject)
          .on('message', resolve),
      );
    },
  };
}
