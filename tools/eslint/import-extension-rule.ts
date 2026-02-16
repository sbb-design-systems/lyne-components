import { existsSync, statSync } from 'fs';
import { dirname, resolve } from 'path';

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    function rule(originalNode: TSESTree.Node): void {
      const node = originalNode as
        | TSESTree.ExportAllDeclaration
        | TSESTree.ExportNamedDeclarationWithSource
        | TSESTree.ImportDeclaration;
      const value = node.source?.value.replace(/\?.*$/, '');
      if (!value || !value.startsWith('.') || value.endsWith('.ts')) {
        return;
      }

      const path = resolve(dirname(context.filename), value);
      if (!existsSync(path)) {
        context.report({
          node,
          messageId: 'importExtensionRule',
          data: { import: value },
          fix: !node.source.value.includes('?')
            ? (fixer) =>
                fixer.replaceText(node.source, `'${node.source.value.replace(/\.js$/, '')}.ts'`)
            : undefined,
        });
      } else if (existsSync(path) && statSync(path).isDirectory()) {
        context.report({
          node,
          messageId: 'importExtensionRule',
          data: { import: value },
          fix: (fixer) => fixer.replaceText(node.source, `'${node.source.value}.ts'`),
        });
      }
    }

    return {
      DeclareExportDeclaration: rule,
      DeclareExportAllDeclaration: rule,
      ExportAllDeclaration: rule,
      ExportNamedDeclaration: rule,
      ImportDeclaration: rule,
    };
  },
  meta: {
    docs: {
      description: 'Relative imports and exports must end with .ts',
    },
    messages: {
      importExtensionRule: 'Missing .ts extension in import/export path ({{ import }})',
      importIndexExtensionRule: 'Missing index.ts in import/export path ({{ import }})',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
