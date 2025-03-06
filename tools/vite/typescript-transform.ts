import { EOL } from 'node:os';

import * as ts from 'typescript';
import type { CompilerOptions, DiagnosticMessageChain } from 'typescript';
import type { PluginOption, Rollup } from 'vite';

import { prepareCompilerOptions } from '../node-esm-hook/typescript-hook.js';

export function typescriptTransform(): PluginOption {
  const cache: Map<string, CompilerOptions> = new Map();

  return {
    enforce: 'pre',
    name: 'vite-plugin-typescript-transform',

    buildStart(): void {
      cache.clear();
    },

    transform(code: string, file: string): Rollup.TransformResult {
      if (!file.split('?')[0].endsWith('.ts')) {
        return;
      }

      try {
        const compilerOptions = prepareCompilerOptions(cache, file);
        const transpileResult = ts.transpileModule(code, { compilerOptions, fileName: file });
        if (transpileResult.sourceMapText) {
          // istanbul (code coverage) tries to resolve the path to the source
          // which is wrongly generated with the above configuration.
          // We fix this by reducing the relative path to the basename.
          // TODO: Figure out if the configuration above can be fixed.
          const sourceMap = JSON.parse(transpileResult.sourceMapText);
          const basename = sourceMap.sources[0].split('/').at(-1);
          sourceMap.sources[0] = `./${basename}`;
          transpileResult.sourceMapText = JSON.stringify(sourceMap);
        }

        return {
          code: transpileResult.outputText,
          map: transpileResult.sourceMapText,
        };
      } catch (error) {
        this.error(
          typeof error === 'string' || error instanceof Error
            ? error
            : ts.flattenDiagnosticMessageText(error as DiagnosticMessageChain, EOL),
        );
      }
    },
  };
}
