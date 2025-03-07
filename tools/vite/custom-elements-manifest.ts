import { fileURLToPath } from 'node:url';

import { cli } from '@custom-elements-manifest/analyzer/cli';
import type { PluginOption } from 'vite';

import { root } from './build-meta.js';

export function customElementsManifest(library: string): PluginOption {
  return {
    name: 'custom-elements-definition',
    closeBundle() {
      this.info(`Generating custom elements manifest`);
      return cli({
        argv: [
          'analyze',
          '--config',
          fileURLToPath(
            new URL(`./tools/manifest/${library}-custom-elements-manifest.config.js`, root),
          ),
        ],
        cwd: fileURLToPath(root),
      });
    },
  };
}
