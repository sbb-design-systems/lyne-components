import { join } from 'path';

import * as sass from 'sass';
import type { PluginOption, ResolvedConfig } from 'vite';

import { root } from './build-meta.js';

export function typography(): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'typography',
    configResolved(config) {
      viteConfig = config;
    },
    generateBundle() {
      const globalCss = sass.compile(join(viteConfig.root, 'core/styles/global.scss'), {
        loadPaths: [root.pathname, join(root.pathname, '/node_modules/')],
      });
      this.emitFile({
        type: 'asset',
        fileName: 'global.css',
        source: globalCss.css,
      });

      const fullFont = sass.compile(join(viteConfig.root, 'core/styles/fullfont.scss'), {
        loadPaths: [root.pathname, join(root.pathname, '/node_modules/')],
      });
      this.emitFile({
        type: 'asset',
        fileName: 'fullfont.css',
        source: fullFont.css,
      });
    },
  };
}
