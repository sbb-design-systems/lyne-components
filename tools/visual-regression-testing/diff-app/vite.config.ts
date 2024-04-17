import { existsSync, readdirSync, readFileSync } from 'fs';
import { relative } from 'path';

import {
  defineConfig,
  mergeConfig,
  type PluginOption,
  type ResolvedConfig,
  type UserConfig,
} from 'vite';

import rootConfig from '../../../vite.config.js';
import { distDir } from '../../vite/index.js';

const packageRoot = new URL('.', import.meta.url);
const screenshotsDir = new URL(`./screenshots/`, distDir);

export interface FailedFiles {
  browserName: string;
  name: string;
  failedFile: string;
  diffFile: string;
  baselineFile: string;
  isNew: boolean;
}

function prepareScreenshots(): PluginOption {
  let viteConfig: ResolvedConfig;
  const virtualModuleId = 'virtual:screenshots';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'prepare screenshot',
    configResolved(config) {
      viteConfig = config;
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const browsers = readdirSync(screenshotsDir, { withFileTypes: true })
          .filter((d) => d.name !== '.cache')
          .map((d) => d.name);

        const screenshotsMeta = browsers
          .filter((browserName) => existsSync(new URL(`./${browserName}/failed/`, screenshotsDir)))
          .flatMap((browserName) => {
            const failedDir = new URL(`./${browserName}/failed/`, screenshotsDir);

            return readdirSync(failedDir, {
              withFileTypes: true,
            })
              .filter((d) => !d.name.endsWith('-diff.png'))
              .map((d) => {
                const failedFilePath = new URL(`./${d.name}`, failedDir);
                const diffFilePath = new URL(
                  `./${d.name.replace(/.png$/, '-diff.png')}`,
                  failedDir,
                );
                const baselineFilePath = new URL(
                  `./${browserName}/baseline/${d.name}`,
                  screenshotsDir,
                );
                const baselineCacheFilePath = new URL(
                  `./.cache/${browserName}/baseline/${d.name}`,
                  screenshotsDir,
                );

                const isNew = !existsSync(diffFilePath);

                const assetsScreenshots = 'assets/screenshots/';
                const failedRelativeFileName =
                  assetsScreenshots + relative(screenshotsDir.pathname, failedFilePath.pathname);
                const diffRelativeFileName =
                  assetsScreenshots + relative(screenshotsDir.pathname, diffFilePath.pathname);
                const baselineRelativeFileName =
                  assetsScreenshots + relative(screenshotsDir.pathname, baselineFilePath.pathname);

                if (viteConfig.command !== 'serve') {
                  this.emitFile({
                    type: 'asset',
                    fileName: failedRelativeFileName,
                    source: readFileSync(failedFilePath),
                  });

                  if (!isNew) {
                    this.emitFile({
                      type: 'asset',
                      fileName: diffRelativeFileName,
                      source: readFileSync(diffFilePath),
                    });

                    this.emitFile({
                      type: 'asset',
                      fileName: baselineRelativeFileName,
                      source: readFileSync(
                        existsSync(baselineFilePath) ? baselineFilePath : baselineCacheFilePath,
                      ),
                    });
                  }
                }

                return <FailedFiles>{
                  browserName,
                  name: d.name,
                  failedFile: failedRelativeFileName,
                  diffFile: diffRelativeFileName,
                  baselineFile: baselineRelativeFileName,
                  isNew,
                };
              });
          })
          .reduce(
            (current, next) =>
              current.set(
                next.name,
                current.has(next.name) ? current.get(next.name)!.concat(next) : [next],
              ),
            new Map<string, FailedFiles[]>(),
          );

        return `export const screenshots = ${JSON.stringify(Object.fromEntries(screenshotsMeta))}`;
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/assets/screenshots/')) {
          console.log(req.url);
          res.end(readFileSync(new URL(`.${req.url.substring(7)}`, distDir)));
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() =>
  mergeConfig(rootConfig, <UserConfig>{
    root: packageRoot.pathname,
    plugins: [prepareScreenshots()],
    build: {
      outDir: new URL(`./diff-app/`, distDir).pathname,
      emptyOutDir: true,
    },
  }),
);
