import { join } from 'path';

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

const isProdBuild = ({ command, mode }: ConfigEnv): boolean =>
  command === 'build' && mode !== 'development';

// create css file

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
              exclude: ['**/*.{stories,spec,e2e}.{ts,tsx}', 'vite.config.ts'],
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
            copyAssets(['_index.scss', 'core/styles/**/*.scss']),
            typography(),
          ]
        : []),
    ],
    build: {
      cssMinify: isProdBuild(config),
      lib: {
        // Include all directories containing an index.ts
        entry: globIndexMap(packageRoot),
        formats: ['es'],
      },
      minify: false,
      outDir: outDir.pathname,
      emptyOutDir: true,
    },
    assetsInclude: ['_index.scss', 'core/styles/**/*.scss'],
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
