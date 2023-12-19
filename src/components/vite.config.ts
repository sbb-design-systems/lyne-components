import { dirname, join } from 'path';

import { cli } from '@custom-elements-manifest/analyzer/cli';
import * as sass from 'sass';
import {
  ConfigEnv,
  PluginOption,
  ResolvedConfig,
  UserConfig,
  defineConfig,
  mergeConfig,
} from 'vite';
import dts from 'vite-plugin-dts';

import rootConfig, { copyAssets, globIndexMap, packageJsonTemplate, root } from '../../vite.config';

const packageRoot = new URL('.', import.meta.url);
const outDir = new URL('./dist/components/', root);
// Include all directories containing an index.ts
const entryPoints = globIndexMap(packageRoot);
const entryPointRoots = Object.keys(entryPoints)
  .map((e) => join(packageRoot.pathname, dirname(e)))
  .sort();
const barrelExports = entryPointRoots
  .filter((v) => entryPointRoots.some((e) => e.startsWith(`${v}/`)))
  .map((e) => `${e}/index.ts`);

const isProdBuild = ({ command, mode }: ConfigEnv): boolean =>
  command === 'build' && mode !== 'development';

/* eslint-disable @typescript-eslint/no-use-before-define */
export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: packageRoot.pathname,
    plugins: [
      ...(isProdBuild(config)
        ? [
            dts({
              entryRoot: '.',
              include: `**/*.ts`,
              exclude: ['**/*.{stories,spec,e2e}.ts', 'vite.config.ts'],
            }),
            customElementsManifest(),
            packageJsonTemplate({
              exports: {
                '.': { sass: './_index.scss' },
                './typography.css': {
                  style: './typography.css',
                },
              },
            }),
            copyAssets(['_index.scss', 'core/styles/**/*.scss', '../../README.md']),
            typography(),
          ]
        : []),
    ],
    build: {
      cssMinify: isProdBuild(config),
      lib: {
        entry: entryPoints,
        formats: ['es'],
      },
      minify: false,
      outDir: outDir.pathname,
      emptyOutDir: true,
      rollupOptions: {
        external: (source: string, importer: string | undefined) => {
          if (
            source.match(/(^lit$|^lit\/|^@lit\/)/) ||
            (source.startsWith('../') && !importer.includes('/node_modules/')) ||
            (!!importer && barrelExports.includes(importer) && source.match(/\.\/[a-z-]+/))
          ) {
            return true;
          }
        },
      },
    },
    assetsInclude: ['_index.scss', 'core/styles/**/*.scss', 'README.md'],
  }),
);

function customElementsManifest(): PluginOption {
  return {
    name: 'custom-elements-definition',
    closeBundle() {
      this.info(`Generating custom elements manifest`);
      return cli({
        argv: [
          'analyze',
          '--config',
          new URL('./config/custom-elements-manifest.config.js', root).pathname,
        ],
        cwd: root.pathname,
      });
    },
  };
}

function typography(): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'typography',
    configResolved(config) {
      viteConfig = config;
    },
    generateBundle() {
      const globalCss = sass.compile(join(viteConfig.root, 'core/styles/global.scss'), {
        loadPaths: [root.pathname],
      });
      this.emitFile({
        type: 'asset',
        fileName: 'typography.css',
        source: globalCss.css,
      });
    },
  };
}
