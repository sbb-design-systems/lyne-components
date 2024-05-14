import { createHash } from 'crypto';
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

import type { FailedFiles } from './interfaces.js';

const packageRoot = new URL('.', import.meta.url);
const screenshotsDir = new URL(`./screenshots/`, distDir);

const extractHierarchicalMap = (
  screenshots: Map<string, FailedFiles[]>,
): Map<string, Map<string, Map<string, FailedFiles[]>>> => {
  const map = new Map<string, Map<string, Map<string, FailedFiles[]>>>();

  screenshots.forEach((failedFiles, fileName) => {
    const component = fileName.match(/^(.*?)_/)![1];
    const name = fileName.match(/_viewport=.*?_(.*?).png$/)![1];
    const viewport = fileName.match(/viewport=(.*?)_/)![1];

    if (!map.has(component)) {
      map.set(component, new Map());
    }

    const componentsMap = map.get(component)!;

    if (!componentsMap.has(name)) {
      componentsMap.set(name, new Map());
    }

    const testCaseMap = componentsMap.get(name)!;

    testCaseMap.set(
      viewport,
      failedFiles.map((failedFile) => ({ ...failedFile, viewport })),
    );
  });
  return map;
};

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
        const failedScreenshotsHash = createHash('sha256');
        const screenshotsFailures = existsSync(screenshotsDir)
          ? readdirSync(screenshotsDir, { withFileTypes: true })
              .map((d) => d.name)
              .filter((browserName) =>
                existsSync(new URL(`./${browserName}/failed/`, screenshotsDir)),
              )
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

                    const isNew = !existsSync(diffFilePath);

                    const assetsScreenshots = 'assets/screenshots/';
                    const failedRelativeFileName =
                      assetsScreenshots +
                      relative(screenshotsDir.pathname, failedFilePath.pathname);
                    const diffRelativeFileName =
                      assetsScreenshots + relative(screenshotsDir.pathname, diffFilePath.pathname);
                    const baselineRelativeFileName =
                      assetsScreenshots +
                      relative(screenshotsDir.pathname, baselineFilePath.pathname);

                    if (viteConfig.command !== 'serve') {
                      const failedFileContent = readFileSync(failedFilePath);
                      // We only add the failed screenshot hashes, as the baseline and comparison (*-diff.png)
                      // are not relevant to detect whether it is a new difference.
                      failedScreenshotsHash.update(failedFileContent);
                      this.emitFile({
                        type: 'asset',
                        fileName: failedRelativeFileName,
                        source: failedFileContent,
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
                          source: readFileSync(baselineFilePath),
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
          : [];

        const screenshotsMeta = screenshotsFailures.reduce(
          (current, next) =>
            current.set(
              next.name,
              current.has(next.name) ? current.get(next.name)!.concat(next) : [next],
            ),
          new Map<string, FailedFiles[]>(),
        );

        if (viteConfig.command !== 'serve') {
          this.emitFile({
            type: 'asset',
            fileName: 'diff.json',
            source: JSON.stringify({
              changedAmount: screenshotsFailures.filter((f) => !f.isNew).length,
              newAmount: screenshotsFailures.filter((f) => f.isNew).length,
              hash: failedScreenshotsHash.digest('hex'),
            }),
          });
        }

        return `export const screenshotsRaw = ${JSON.stringify(
          extractHierarchicalMap(screenshotsMeta),
          (_key, value) => {
            if (value instanceof Map) {
              return Object.fromEntries(Array.from(value));
            } else {
              return value;
            }
          },
        )}`;
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
