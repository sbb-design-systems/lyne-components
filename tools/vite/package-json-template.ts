import { globSync, readFileSync } from 'fs';
import { join } from 'path';

import type { PluginOption, ResolvedConfig } from 'vite';

import { root } from './build-meta.js';

export function packageJsonTemplate(
  options: {
    templatePath?: string;
    exports?: Record<string, Record<string, unknown>>;
    exportsExtensions?: string[];
  } = {},
): PluginOption {
  options.exportsExtensions ??= ['.js'];
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
      const rootPackageJsonPath = './package.json';
      const packageJsonTemplatePath = options.templatePath ?? './package.json';
      const rootPackageJson = JSON.parse(readFileSync(new URL(rootPackageJsonPath, root), 'utf8'));
      const litVersion = rootPackageJson.dependencies.lit.match(/\d+\.\d+\.\d+/);
      const litObserversVersion =
        rootPackageJson.devDependencies['@lit-labs/observers'].match(/\d+\.\d+\.\d+/);
      const litReactVersion = rootPackageJson.devDependencies['@lit/react'].match(/\d+\.\d+\.\d+/);
      const tslibVersion = rootPackageJson.devDependencies.tslib.match(/\d+\.\d+\.\d+/);
      const designTokensVersion =
        rootPackageJson.devDependencies['@sbb-esta/lyne-design-tokens'].match(/\d+\.\d+\.\d+/);
      const packageJsonTemplate = readFileSync(
        join(viteConfig.root, packageJsonTemplatePath),
        'utf8',
      );
      const packageJsonContent = packageJsonTemplate
        .replaceAll('0.0.0-PLACEHOLDER', rootPackageJson.version)
        .replaceAll('0.0.0-LITOBSERVERS', `^${litObserversVersion}`)
        .replaceAll('0.0.0-LITREACT', `^${litReactVersion}`)
        .replaceAll('0.0.0-TSLIB', `^${tslibVersion}`)
        .replaceAll('0.0.0-LIT', `^${litVersion}`)
        .replaceAll('0.0.0-DESIGNTOKENS', `^${designTokensVersion}`);
      const packageJson = JSON.parse(packageJsonContent);
      for (const key of ['author', 'license', 'repository', 'bugs']) {
        packageJson[key] = rootPackageJson[key];
      }

      packageJson.exports = globSync('**/*.ts', { cwd: viteConfig.root })
        .filter((f) => readFileSync(join(viteConfig.root, f), 'utf8').includes('@entrypoint'))
        .map((f) => f.replace(/\.ts$/, ''))
        .sort()
        .reduce(
          (current, next) =>
            Object.assign(
              current,
              ...options.exportsExtensions!.map((ext) => ({
                [`./${next}${ext}`]: {
                  types: `./development/${next}.d.ts`,
                  development: `./development/${next}.js`,
                  default: `./${next}.js`,
                },
              })),
            ),
          { ...options.exports, './package.json': { default: './package.json' } } as Record<
            string,
            Record<string, string>
          >,
        );

      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: JSON.stringify(packageJson, null, 2),
      });
    },
  };
}
