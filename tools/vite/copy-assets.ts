import { readFileSync } from 'fs';
import { join } from 'path';

import * as glob from 'glob';
import type { PluginOption, ResolvedConfig } from 'vite';

export function copyAssets(includes: string[]): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'package-json-templating',
    configResolved(config) {
      viteConfig = config;
    },
    generateBundle() {
      if (viteConfig.command !== 'build') {
        return;
      }
      for (const file of glob.sync(includes, { cwd: viteConfig.root })) {
        // Remove relative file path if file is on a more upper layer than cwd.
        const fileName = file.replace(/^(\.\.\/)*/, '');
        this.emitFile({
          type: 'asset',
          fileName: fileName,
          source: readFileSync(join(viteConfig.root, file), 'utf8'),
        });
      }
    },
  };
}
