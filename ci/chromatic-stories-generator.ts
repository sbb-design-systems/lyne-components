import { readdirSync, writeFileSync, renameSync } from 'fs';
import { basename, dirname, join, relative } from 'path';
import Module from 'module';

import { Meta } from '@storybook/html';
import React from 'react';

// Configure stories environment to be able to load story file.
for (const extension of ['.md', '.png', '.scss']) {
  Module._extensions[extension] = (module: Module, filePath: string) => {
    if (filePath.endsWith(extension)) {
      module._compile(`module.exports = '';`, filePath);
    }
  };
}

// Necessary to allow importing story files dynamically
// eslint-disable-next-line no-global-assign
window = { navigator: { userAgent: '' }, location: { href: '' } } as any;
window.parent = window.window = window;
globalThis.React = React;

const chromaticFile = join(__dirname, '../src/global/helpers/chromatic.js');

function walk(root: string, filter: RegExp): string[] {
  return readdirSync(root, { withFileTypes: true }).reduce((current, next) => {
    const path = join(root, next.name);
    if (next.isDirectory()) {
      return current.concat(walk(path, filter));
    } else if (next.isFile() && path.match(filter)) {
      return current.concat(path);
    } else {
      return current;
    }
  }, [] as string[]);
}

async function generateChromaticStory(
  storyFile: string,
): Promise<'no params found' | 'disabledSnapshot configured' | undefined> {
  const content: { default: Meta } = await import(storyFile);
  const { disableSnapshot, ...chromaticParameters } = content.default?.parameters?.chromatic ?? {};
  if (!content.default?.parameters) {
    return 'no params found';
  } else if (disableSnapshot !== undefined) {
    return 'disabledSnapshot configured';
  }

  const targetStoryFile = storyFile.replace(/(\.stories\.[^.]+)$/, (_m, m) => `.chromatic${m}`);
  const relativeImport = basename(storyFile).replace(/\.(jsx|tsx)$/, '');
  const chromaticImport = relative(dirname(targetStoryFile), chromaticFile).replace(/\.js$/, '');

  const chromaticConfig = Object.entries(chromaticParameters)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}, `)
    .join('');
  const storyFileContent = `/** @jsx h */
import type { Meta, StoryObj } from '@storybook/html';
import config, * as stories from './${relativeImport}';
import { combineStories } from '${chromaticImport}';

const meta: Meta = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    chromatic: { ${chromaticConfig}disableSnapshot: false },
  },
  title: 'chromatic-only/${content.default.title}',
};

export default meta;

export const chromaticStories: StoryObj = {
  render: combineStories(config, stories)
};
`;
  writeFileSync(targetStoryFile, storyFileContent, 'utf-8');
  return undefined;
}

async function generateChromaticStories(): Promise<void> {
  for (const storyFile of walk(join(__dirname, '../src'), /.stories.js$/)) {
    renameSync(storyFile, storyFile.replace(/\.js$/, '.jsx'));
  }
  console.log(`Generating chromatic story files:`);
  for (const storyFile of walk(join(__dirname, '../src'), /.stories.(jsx|tsx)$/)) {
    if (storyFile.includes('chromatic')) {
      continue;
    }

    try {
      const result = await generateChromaticStory(storyFile);
      if (!result) {
        console.log(`- ${basename(storyFile)}`);
      } else {
        console.log(`- ${basename(storyFile)} (Skipped due to ${result})`);
      }
    } catch (e) {
      console.log(`Failed ${storyFile}`);
      console.log(e);
    }
  }
}

(async () => await generateChromaticStories())();

/* eslint-disable @typescript-eslint/naming-convention */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface Module {
      _compile(code: string, filename: string): string;
    }
  }
}

declare module 'module' {
  export const _extensions: NodeJS.RequireExtensions;
  export function _resolveFilename(
    request: string,
    parent: {
      /**
       * Can be null if the parent id is 'internal/preload' (e.g. via --require)
       * which doesn't have a file path.
       */
      filename: string | null;
    },
    isMain: boolean,
    options?: any,
  ): string;
}
