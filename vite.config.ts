import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as ts from 'typescript';
import { defineConfig, type PluginOption, type Rolldown } from 'vite';

import { lightDarkPlugin, statePlugin } from './tools/postcss/index.ts';

const projectRoot = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig({
  server: { allowedHosts: ['host.containers.internal'] },
  css: {
    postcss: {
      plugins: [lightDarkPlugin, statePlugin],
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    typescriptTransform(),
  ],
  resolve: {
    // Alias used for test and storybook environments
    alias: [
      { find: '@sbb-esta/lyne-elements', replacement: join(projectRoot, 'src/elements') },
      {
        find: '@sbb-esta/lyne-elements-experimental',
        replacement: join(projectRoot, 'src/elements-experimental'),
      },
    ],
  },
});

function typescriptTransform(): PluginOption {
  const name = 'vite-plugin-typescript-transform';
  const cachePath = join(projectRoot, 'node_modules', '.cache', name);
  mkdirSync(cachePath, { recursive: true });
  // Remove stale caches (older than a month)
  const staleDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  readdirSync(cachePath, { withFileTypes: true })
    .filter((d) => d.isFile() && statSync(join(cachePath, d.name)).mtime < staleDate)
    .forEach((d) => rmSync(join(cachePath, d.name)));

  let compilerOptions: ts.CompilerOptions | undefined = undefined;
  let jsonifiedOptions: string | undefined = undefined;

  return {
    enforce: 'pre',
    name,
    configResolved(config) {
      const configName = 'tsconfig.json';
      const tsconfigPath = join(config.root, configName);
      const result = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
      if (result.error) {
        throw result.error;
      }

      compilerOptions = ts.parseJsonConfigFileContent(
        result.config,
        ts.sys,
        config.root,
        undefined,
        configName,
      ).options;
      compilerOptions.module = ts.ModuleKind.ESNext;
      compilerOptions.moduleResolution = ts.ModuleResolutionKind.Bundler;
      jsonifiedOptions = JSON.stringify(compilerOptions);
    },
    transform(code: string, file: string): Rolldown.TransformResult {
      const filePath = file.split('?')[0];
      if (!filePath.endsWith('.ts') || filePath.endsWith('.d.ts')) {
        return;
      }

      const key = jsonifiedOptions + file;
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
        this.error(
          typeof error === 'string' || error instanceof Error
            ? error
            : ts.flattenDiagnosticMessageText(error as ts.DiagnosticMessageChain, EOL),
        );
      }
    },
  };
}
