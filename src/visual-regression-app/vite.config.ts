import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  defineConfig,
  mergeConfig,
  type PluginOption,
  type ResolvedConfig,
  type UserConfig,
} from 'vite';

import rootConfig from '../../vite.config.ts';

import type { ScreenshotFiles, Meta } from './src/interfaces.ts';

const distDir = new URL('../../dist/', import.meta.url);
const screenshotsDir = new URL(`./screenshots/`, distDir);
const assetsScreenshotsDir = 'assets/screenshots/';

const extractHierarchicalMap = (
  screenshots: Omit<ScreenshotFiles, 'viewport'>[],
): Map<string, Map<string, Map<string, ScreenshotFiles[]>>> => {
  const map = new Map<string, Map<string, Map<string, ScreenshotFiles[]>>>();

  screenshots.forEach((screenshotFiles) => {
    const component = screenshotFiles.name.match(/^(.*?)_/)![1];
    const name = screenshotFiles.name.match(/_viewport=.*?_(.*?).png$/)![1];
    const viewport = screenshotFiles.name.match(/viewport=(.*?)_/)![1];

    if (!map.has(component)) {
      map.set(component, new Map());
    }

    const componentsMap = map.get(component)!;

    if (!componentsMap.has(name)) {
      componentsMap.set(name, new Map());
    }

    const testCaseMap = componentsMap.get(name)!;

    if (!testCaseMap.has(viewport)) {
      testCaseMap.set(viewport, []);
    }

    testCaseMap.set(
      viewport,
      testCaseMap.get(viewport)!.concat({ ...screenshotFiles, viewport } satisfies ScreenshotFiles),
    );
  });

  return map;
};

function prepareScreenshots(): PluginOption {
  let viteConfig: ResolvedConfig;
  const virtualModuleScreenshotsId = 'virtual:screenshots';
  const resolvedVirtualModuleScreenshotsId = '\0' + virtualModuleScreenshotsId;

  const virtualModuleMetaId = 'virtual:meta';
  const resolvedVirtualModuleMetaId = '\0' + virtualModuleMetaId;

  return {
    name: 'prepare screenshot',
    configResolved(config) {
      viteConfig = config;
    },
    resolveId(id) {
      if (id === virtualModuleScreenshotsId) {
        return resolvedVirtualModuleScreenshotsId;
      }
      if (id === virtualModuleMetaId) {
        return resolvedVirtualModuleMetaId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleScreenshotsId) {
        if (!existsSync(screenshotsDir)) {
          return `export const screenshotsRaw = []`;
        }

        const browserNames = readdirSync(screenshotsDir, { withFileTypes: true }).map(
          (d) => d.name,
        );
        const failedScreenshotsHash = createHash('sha256');

        let screenshots = browserNames
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

                const isNew = !existsSync(diffFilePath);

                const failedRelativeFileName =
                  assetsScreenshotsDir + relative(screenshotsDir.pathname, failedFilePath.pathname);
                const diffRelativeFileName =
                  assetsScreenshotsDir + relative(screenshotsDir.pathname, diffFilePath.pathname);
                const baselineRelativeFileName =
                  assetsScreenshotsDir +
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

                return {
                  browserName,
                  name: d.name,
                  failedFile: failedRelativeFileName,
                  diffFile: !isNew ? diffRelativeFileName : undefined,
                  baselineFile: !isNew ? baselineRelativeFileName : undefined,
                  isNew,
                } as ScreenshotFiles;
              });
          });

        // No Failures, only baseline
        if (screenshots.length === 0) {
          screenshots = browserNames
            .filter((browserName) =>
              existsSync(new URL(`./${browserName}/baseline/`, screenshotsDir)),
            )
            .flatMap((browserName) => {
              const baselineDir = new URL(`./${browserName}/baseline/`, screenshotsDir);

              return readdirSync(baselineDir, {
                withFileTypes: true,
              })
                .filter((d) => d.name.endsWith('.png'))
                .map((d) => {
                  const baselineFilePath = new URL(
                    `./${browserName}/baseline/${d.name}`,
                    screenshotsDir,
                  );

                  const baselineRelativeFileName =
                    assetsScreenshotsDir +
                    relative(screenshotsDir.pathname, baselineFilePath.pathname);

                  if (viteConfig.command !== 'serve') {
                    this.emitFile({
                      type: 'asset',
                      fileName: baselineRelativeFileName,
                      source: readFileSync(baselineFilePath),
                    });
                  }

                  return {
                    browserName,
                    name: d.name,
                    baselineFile: baselineRelativeFileName,
                    isNew: false,
                  } as ScreenshotFiles;
                });
            });
        }

        if (viteConfig.command !== 'serve') {
          this.emitFile({
            type: 'asset',
            fileName: 'diff.json',
            source: JSON.stringify({
              changedAmount: screenshots.filter((f) => !f.isNew).length,
              newAmount: screenshots.filter((f) => f.isNew).length,
              hash: failedScreenshotsHash.digest('hex'),
            }),
          });
        }

        return `export const screenshotsRaw = ${JSON.stringify(
          extractHierarchicalMap(screenshots),
          (_key, value) => (value instanceof Map ? Object.fromEntries(Array.from(value)) : value),
        )}`;
      }

      if (id === resolvedVirtualModuleMetaId) {
        let meta: Pick<Meta, 'gitSha' | 'baselineGitSha'>;

        try {
          meta = JSON.parse(readFileSync(new URL('./meta.json', screenshotsDir), 'utf8'));
        } catch {
          meta = { gitSha: 'local', baselineGitSha: 'N/A' };
        }

        const metaToWrite = {
          ...meta,
          commitUrl: `https://github.com/sbb-design-systems/lyne-components/commit/${meta.gitSha}`,
          baselineCommitUrl: `https://github.com/sbb-design-systems/lyne-components/commit/${meta.baselineGitSha}`,
        } satisfies Meta;

        if (viteConfig.command !== 'serve') {
          this.emitFile({
            type: 'asset',
            fileName: 'meta.json',
            source: JSON.stringify(meta),
          });
        }

        return `export const meta = ${JSON.stringify(metaToWrite)};`;
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
  mergeConfig(rootConfig, {
    root: dirname(fileURLToPath(import.meta.url)),
    plugins: [prepareScreenshots()],
    build: {
      outDir: fileURLToPath(new URL(`./visual-regression-app/`, distDir)),
      emptyOutDir: true,
    },
    esbuild: {
      supported: {
        'top-level-await': true, // Browsers can handle top-level-await features, used for the URLPattern polyfill.
      },
    },
  } satisfies UserConfig),
);
