/* eslint-disable import-x/no-named-as-default-member */
import { createHash } from 'node:crypto';
import {
  mkdirSync,
  readdirSync,
  statSync,
  rmSync,
  existsSync,
  utimesSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TsdownPluginOption, ResolvedConfig as TsdownResolvedConfig } from 'tsdown';
import ts from 'typescript';
import type { PluginOption, ResolvedConfig, Rolldown } from 'vite';

import { parseCompilerOptions } from './parse-compiler-options.ts';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

export function typescriptTransform(): PluginOption | TsdownPluginOption {
  const name = 'plugin-typescript-transform';
  const cachePath = join(projectRoot, 'node_modules', '.cache', name);
  mkdirSync(cachePath, { recursive: true });
  // Remove stale caches (older than a week)
  const staleDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  readdirSync(cachePath, { withFileTypes: true })
    .filter((d) => d.isFile() && statSync(join(cachePath, d.name)).mtime < staleDate)
    .forEach((d) => rmSync(join(cachePath, d.name)));

  let compilerOptions: ts.CompilerOptions | undefined = undefined;
  let jsonifiedOptions: string | undefined = undefined;
  const configResolved = <T extends ResolvedConfig | TsdownResolvedConfig>(config: T): void => {
    const tsconfigPath =
      'tsconfig' in config && typeof config.tsconfig === 'string' && config.tsconfig
        ? config.tsconfig
        : join(config.root, 'tsconfig.json');
    compilerOptions = parseCompilerOptions(tsconfigPath);
    compilerOptions.module = ts.ModuleKind.ESNext;
    compilerOptions.moduleResolution = ts.ModuleResolutionKind.Bundler;
    jsonifiedOptions = JSON.stringify(compilerOptions);
  };

  return {
    enforce: 'pre',
    name,
    configResolved,
    tsdownConfigResolved: configResolved,
    transform(code: string, file: string): Rolldown.TransformResult {
      const filePath = file.split('?')[0];
      if (!filePath.endsWith('.ts') || filePath.endsWith('.d.ts')) {
        return;
      }

      const key = jsonifiedOptions + code;
      const hash = createHash('sha256').update(key).digest('hex');
      const cacheFilePath = join(cachePath, hash);
      if (existsSync(cacheFilePath)) {
        utimesSync(cacheFilePath, new Date(), new Date());
        return JSON.parse(readFileSync(cacheFilePath, 'utf-8'));
      }

      try {
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

        const result = { code: transpileResult.outputText, map: transpileResult.sourceMapText };
        writeFileSync(cacheFilePath, JSON.stringify(result));
        return result;
      } catch (error) {
        throw new Error(
          typeof error === 'string' || error instanceof Error
            ? error.toString()
            : ts.flattenDiagnosticMessageText(error as ts.DiagnosticMessageChain, EOL),
          { cause: error },
        );
      }
    },
  };
}
