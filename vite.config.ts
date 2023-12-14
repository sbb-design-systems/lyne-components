import { readFileSync } from 'fs';
import { join } from 'path';

import * as glob from 'glob';
import postcssLit from 'rollup-plugin-postcss-lit';
import { PluginOption, ResolvedConfig, defineConfig } from 'vite';

export const root = new URL('.', import.meta.url);

export function packageJsonTemplate(
  options: { exports?: Record<string, Record<string, unknown>>; sideEffects?: string[] } = {},
): PluginOption {
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
      const packageJsonPath = './package.json';
      const rootPackageJson = JSON.parse(readFileSync(new URL(packageJsonPath, root), 'utf8'));
      const litMajorVersion = +rootPackageJson.dependencies.lit.match(/\d+/);
      const reactMajorVersion = +rootPackageJson.devDependencies.react.match(/\d+/);
      const litReactMajorVersion = +rootPackageJson.devDependencies['@lit/react'].match(/\d+/);
      const packageJsonTemplate = readFileSync(join(viteConfig.root, packageJsonPath), 'utf8');
      const packageJsonContent = packageJsonTemplate
        .replaceAll('0.0.0-PLACEHOLDER', rootPackageJson.version)
        .replaceAll('0.0.0-LITREACT', `^${litReactMajorVersion}.0.0`)
        .replaceAll('0.0.0-REACT', `^${reactMajorVersion}.0.0`)
        .replaceAll('0.0.0-LIT', `^${litMajorVersion}.0.0`);
      const packageJson = JSON.parse(packageJsonContent);
      for (const key of ['author', 'license', 'repository', 'bugs']) {
        packageJson[key] = rootPackageJson[key];
      }

      const lib = viteConfig.build.lib;
      if (lib && typeof lib.entry === 'object' && !Array.isArray(lib.entry)) {
        const exports = Object.entries(lib.entry)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .reduce(
            (current, next) =>
              Object.assign(current, {
                [`./${next[0].replace(/\/index$/, '')}`]: {
                  types: `./${next[0]}.d.ts`,
                  esm: `./${next[0]}.js`,
                  default: `./${next[0]}.js`,
                },
              }),
            { ...options.exports, './package.json': { default: './package.json' } } as Record<
              string,
              Record<string, string>
            >,
          );
        packageJson.exports = exports;
      } else if (options.exports) {
        packageJson.exports = options.exports;
      }

      if (options.sideEffects) {
        packageJson.sideEffects = options.sideEffects;
      }

      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: JSON.stringify(packageJson, null, 2),
      });
    },
  };
}

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

export function globIndexMap(cwd: URL): Record<string, string> {
  return glob.sync('**/index.ts', { cwd }).reduce(
    (current, next) =>
      Object.assign(current, {
        [next.replace(/\.ts$/, '')]: next,
      }),
    {} as Record<string, string>,
  );
}

export default defineConfig({
  plugins: [postcssLit({ exclude: ['**/core/styles/**/*', '**/storybook/**/*'] })],
  build: {
    rollupOptions: {
      external: [/^lit\/?/],
    },
  },
});
