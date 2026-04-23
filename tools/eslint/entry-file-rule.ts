import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { basename, dirname, join } from 'path';

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

function findComponentFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...findComponentFiles(fullPath));
    } else if (entry.endsWith('.component.ts')) {
      results.push(fullPath);
    }
  }
  return results.sort();
}

function extractClassNames(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf-8');
  const classNames: string[] = [];
  const regex = /export\s+class\s+(Sbb\w+Element)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    classNames.push(match[1]);
  }
  // Also handle: class SbbXyzElement (without export keyword on same line)
  const regex2 = /^class\s+(Sbb\w+Element)/gm;
  while ((match = regex2.exec(content)) !== null) {
    if (!classNames.includes(match[1])) {
      classNames.push(match[1]);
    }
  }
  return classNames;
}

function generateEntryFile(pureName: string, classNames: string[]): string {
  const sorted = [...classNames].sort();
  const importList =
    sorted.length <= 2
      ? `{ ${sorted.join(', ')} }`
      : `{\n${sorted.map((n) => `  ${n},`).join('\n')}\n}`;
  const defines = sorted.map((n) => `${n}.define();`).join('\n');

  return `/** @entrypoint */
import ${importList} from './${pureName}.pure.ts';

export * from './${pureName}.pure.ts';

${defines}
`;
}

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const filename = context.filename;

    // Only run on entry files that have a corresponding .pure.ts
    if (
      filename.endsWith('.pure.ts') ||
      filename.endsWith('.stories.ts') ||
      filename.endsWith('.spec.ts')
    ) {
      return {};
    }
    if (!filename.endsWith('.ts')) {
      return {};
    }

    const dir = dirname(filename);
    const entryName = basename(filename, '.ts');
    const pureFile = join(dir, `${entryName}.pure.ts`);

    if (!existsSync(pureFile)) {
      return {};
    }

    const moduleDir = join(dir, entryName);
    let componentFiles: string[];
    try {
      componentFiles = findComponentFiles(moduleDir);
    } catch {
      return {};
    }

    const classNames = componentFiles.flatMap((f) => extractClassNames(f));
    if (!classNames.length) {
      return {};
    }

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Program:exit'(node: TSESTree.Program) {
        const expectedContent = generateEntryFile(entryName, classNames);
        const actualContent = context.sourceCode.getText();

        const sortedClassNames = [...classNames].sort();

        const missingImports = sortedClassNames.filter((name) => !actualContent.includes(name));
        const hasReExport = actualContent.includes(`export * from './${entryName}.pure.ts'`);
        const missingDefines = sortedClassNames.filter(
          (name) => !actualContent.includes(`${name}.define()`),
        );

        if (missingImports.length || !hasReExport || missingDefines.length) {
          const issues: string[] = [];
          if (missingImports.length) {
            issues.push(`missing imports: ${missingImports.join(', ')}`);
          }
          if (!hasReExport) {
            issues.push('missing re-export');
          }
          if (missingDefines.length) {
            issues.push(`missing .define() calls: ${missingDefines.join(', ')}`);
          }

          context.report({
            node,
            messageId: 'incompleteEntryFile',
            data: { issues: issues.join('; ') },
            fix(fixer) {
              return fixer.replaceTextRange([0, actualContent.length], expectedContent);
            },
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        'Entry files must import all component classes from the corresponding *.pure.ts file, re-export the pure module, and call .define() on each component.',
    },
    messages: {
      incompleteEntryFile: 'Entry file is incomplete: {{ issues }}.',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
