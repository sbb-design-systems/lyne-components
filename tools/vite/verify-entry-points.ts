import { join, relative } from 'path';

import type { LibraryOptions, PluginOption, ResolvedConfig } from 'vite';

export function verifyEntryPoints(): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'package-json-templating',
    configResolved(config) {
      viteConfig = config;
    },
    async closeBundle() {
      if (viteConfig.command !== 'build') {
        return;
      }
      const entry = (viteConfig.build.lib as LibraryOptions).entry as Record<string, string>;
      const dir = new URL('./', import.meta.url);
      for (const entryPoint of Object.keys(entry)) {
        await import(relative(dir.pathname, join(viteConfig.build.outDir, entryPoint + '.js')));
      }
    },
  };
}
