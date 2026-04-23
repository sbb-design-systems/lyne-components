import { readdirSync, statSync } from 'fs';
import { basename, dirname, join, relative } from 'path';

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

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const filename = context.filename;
    if (!filename.endsWith('.pure.ts')) {
      return {};
    }

    const dir = dirname(filename);
    const moduleName = basename(filename, '.pure.ts');
    const moduleDir = join(dir, moduleName);

    let componentFiles: string[];
    try {
      componentFiles = findComponentFiles(moduleDir);
    } catch {
      return {};
    }

    const exportedPaths = new Set<string>();

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportAllDeclaration(node: TSESTree.ExportAllDeclaration) {
        if (node.source?.value) {
          const resolvedPath = join(dir, node.source.value);
          exportedPaths.add(resolvedPath);
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Program:exit'(node: TSESTree.Program) {
        const missingFiles = componentFiles.filter((f) => !exportedPaths.has(f));

        if (!missingFiles.length) {
          return;
        }

        const missingExports = missingFiles
          .map((f) => `./${relative(dir, f)}`)
          .map((p) => `export * from '${p}';`)
          .join('\n');

        context.report({
          node,
          messageId: 'missingComponentExport',
          data: {
            files: missingFiles.map((f) => basename(f)).join(', '),
          },
          fix(fixer) {
            const lastExport = [...node.body]
              .reverse()
              .find((n) => n.type === 'ExportAllDeclaration');
            if (lastExport) {
              return fixer.insertTextAfter(lastExport, '\n' + missingExports);
            }
            // No existing exports: insert at end of file
            const lastNode = node.body[node.body.length - 1];
            if (lastNode) {
              return fixer.insertTextAfter(lastNode, '\n' + missingExports + '\n');
            }
            return fixer.insertTextAfterRange([0, 0], missingExports + '\n');
          },
        });
      },
    };
  },
  meta: {
    docs: {
      description: 'All *.component.ts files must be exported in the corresponding *.pure.ts file.',
    },
    messages: {
      missingComponentExport: 'Missing export(s) for: {{ files }}',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
