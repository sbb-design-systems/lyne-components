import { register } from 'node:module';
import { platform } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { LibraryOptions, PluginOption, ResolvedConfig } from 'vite';

register('../node-esm-hook/lyne-alias-hook.js', import.meta.url);

export function verifyEntryPoints(): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'package-json-templating',
    configResolved(config) {
      viteConfig = config;
    },
    async closeBundle() {
      // On windows, the files are not yet written when closeBundle is called.
      if (viteConfig.command !== 'build' || platform() === 'win32') {
        return;
      }
      const entry = (viteConfig.build.lib as LibraryOptions).entry as Record<string, string>;
      const dir = new URL('./', import.meta.url);
      for (const entryPoint of Object.keys(entry)) {
        await import(
          relative(
            fileURLToPath(dir),
            join(viteConfig.build.outDir, entryPoint + '.js'),
          ).replaceAll('\\', '/')
        );
      }
    },
  };
}
