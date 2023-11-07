/* eslint-disable @typescript-eslint/naming-convention */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const chromaticFile = join(__dirname, '../src/storybook/testing/chromatic.tsx');

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

function extractParameters(sourceFile: ts.SourceFile): Record<string, any> | undefined {
  return ts.forEachChild(sourceFile, (node) => {
    if (ts.isVariableStatement(node)) {
      return ts.forEachChild(node.declarationList, (node2) => {
        if (node2?.name?.getText() === 'meta') {
          return ts.forEachChild(node2.initializer, (node3) => {
            if (node3?.name?.getText() === 'parameters') {
              return Function(
                `return ${node3.initializer.getText().replace(/\w*\.events\.\w*/gm, '"dummy"')}`,
              )() as Record<string, any>;
            }
          });
        }
      });
    }
  });
}

function extractTitle(sourceFile: ts.SourceFile): string | undefined {
  return ts.forEachChild(sourceFile, (node) => {
    if (ts.isVariableStatement(node)) {
      return ts.forEachChild(node.declarationList, (node2) => {
        if (node2?.name?.getText() === 'meta') {
          return ts.forEachChild(node2.initializer, (node3) => {
            if (node3?.name?.getText() === 'title') {
              return node3.initializer.getText().replaceAll("'", '') as string;
            }
          });
        }
      });
    }
  });
}

async function generateChromaticStory(
  storyFile: string,
): Promise<'no params found' | 'disabledSnapshot configured' | undefined> {
  const content = readFileSync(storyFile, 'utf8');
  const sourceFile = ts.createSourceFile(storyFile, content, ts.ScriptTarget.ES2020, true);
  const parameters = extractParameters(sourceFile);
  if (!parameters) {
    return 'no params found';
  }

  const { disableSnapshot, ...chromaticParameters } = parameters?.chromatic ?? {};
  if (!parameters) {
    return 'no params found';
  } else if (disableSnapshot !== undefined) {
    return 'disabledSnapshot configured';
  }

  const targetStoryFile = storyFile.replace(/(\.stories\.[^.]+)$/, (_m, m) => `.chromatic${m}`);
  const relativeImport = basename(storyFile).replace(/\.(jsx|tsx)$/, '');
  const chromaticImport = relative(dirname(targetStoryFile), chromaticFile).replace(/\.tsx$/, '');

  const chromaticConfig = Object.entries(chromaticParameters)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}, `)
    .join('');
  const storyFileContent = `/** @jsx h */
import type { Meta, StoryObj } from '@storybook/web-components';
import config, * as stories from './${relativeImport}';
import { combineStories } from '${chromaticImport}';

const meta: Meta = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    chromatic: { ${chromaticConfig}disableSnapshot: false },
  },
  title: 'chromatic-only/${extractTitle(sourceFile)}',
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
