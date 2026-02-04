import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';
import * as sass from 'sass';
import type { PluginOption, ResolvedConfig } from 'vite';

import { lightDarkPlugin, statePlugin } from '../postcss/index.ts';

import { root } from './build-meta.ts';

export const elementsSheets = [
  { inputName: 'core/styles/a11y.scss', outputName: 'a11y.css' },
  { inputName: 'core/styles/animation.scss', outputName: 'animation.css' },
  { inputName: 'core/styles/badge.scss', outputName: 'badge.css' },
  { inputName: 'core/styles/core.scss', outputName: 'core.css' },
  { inputName: 'core/styles/disable-animation.scss', outputName: 'disable-animation.css' },
  {
    inputName: 'core/styles/font-characters-extension.scss',
    outputName: 'font-characters-extension.css',
  },
  { inputName: 'core/styles/layout.scss', outputName: 'layout.css' },
  { inputName: 'core/styles/lists.scss', outputName: 'lists.css' },
  { inputName: 'core/styles/normalize.scss', outputName: 'normalize.css' },
  { inputName: 'core/styles/off-brand-theme.scss', outputName: 'off-brand-theme.css' },
  {
    inputName: 'core/styles/safety-theme.scss',
    outputName: 'safety-theme.css',
  },
  { inputName: 'core/styles/scrollbar.scss', outputName: 'scrollbar.css' },
  { inputName: 'core/styles/standard-theme.scss', outputName: 'standard-theme.css' },
  { inputName: 'core/styles/table.scss', outputName: 'table.css' },
  { inputName: 'core/styles/timetable-form.scss', outputName: 'timetable-form.css' },
  { inputName: 'core/styles/typography.scss', outputName: 'typography.css' },
];

export const elementsExperimentalSheets = [
  { inputName: 'core/styles/core.scss', outputName: 'core.css' },
  { inputName: 'core/styles/off-brand-theme.scss', outputName: 'off-brand-theme.css' },
  {
    inputName: 'core/styles/safety-theme.scss',
    outputName: 'safety-theme.css',
  },
  { inputName: 'core/styles/standard-theme.scss', outputName: 'standard-theme.css' },
];

export function typography(sheets: typeof elementsSheets): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'typography',
    configResolved(config) {
      viteConfig = config;
    },
    async generateBundle() {
      for (const entry of sheets) {
        const compiled = sass.compile(join(viteConfig.root, entry.inputName), {
          loadPaths: [fileURLToPath(root), join(fileURLToPath(root), '/node_modules/')],
        });
        const result = postcss([lightDarkPlugin, statePlugin]).process(compiled.css);
        this.emitFile({
          type: 'asset',
          fileName: entry.outputName,
          source: result.css,
        });
      }
    },
  };
}
