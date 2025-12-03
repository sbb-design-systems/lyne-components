import { readFileSync } from 'fs';
import { globSync } from 'node:fs';
import { dirname, join, relative } from 'path';

import type { PluginOption, ResolvedConfig } from 'vite';

import { root } from './build-meta.ts';

export function copySass(sassRoot: string): PluginOption {
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
      for (const file of globSync(`${sassRoot}/**/*.scss`, { cwd: viteConfig.root })) {
        this.emitFile({
          type: 'asset',
          fileName: file,
          source: readFileSync(join(viteConfig.root, file), 'utf8').replace(
            /(@use|@import) '((?!\.|sass:)[^']+)'/g,
            (_m, useOrImport, useFile: string) => {
              useFile = join('node_modules', useFile);
              const outFile = join(sassRoot, useFile.replaceAll('/', '_'));
              this.emitFile({
                type: 'asset',
                fileName: outFile,
                source: readFileSync(new URL(useFile, root), 'utf8'),
              });
              return `${useOrImport} '${relative(dirname(file), outFile)}'`;
            },
          ),
        });
      }
    },
  };
}
