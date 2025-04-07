import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import { ESLintUtils } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    let packageRoot = '';
    let packageName = '';
    const findPackageName = (): string => {
      if (packageName) {
        return packageName;
      }

      let dir = dirname(context.physicalFilename);
      while (dir !== dirname(dir)) {
        const potentialPackageJsonPath = join(dir, 'package.json');
        if (existsSync(potentialPackageJsonPath)) {
          packageRoot = dir;
          packageName = JSON.parse(readFileSync(potentialPackageJsonPath, 'utf8')).name;
          return packageName;
        }

        dir = dirname(dir);
      }

      throw new Error('package.json not found');
    };

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(node) {
        // Our packages all start with @sbb, so we can save a bit of
        // computation time if we exclude anything that does not start
        // with that.
        if (
          node.source.value.startsWith('@sbb') &&
          node.source.value.startsWith(findPackageName())
        ) {
          context.report({
            messageId: 'nonRelativeImport',
            node,
            fix: (fixer) =>
              fixer.replaceText(
                node.source,
                `'${relative(
                  dirname(context.physicalFilename),
                  packageRoot + node.source.value.substring(packageName.length),
                )}'`,
              ),
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Imports to a module inside the same package should be relative',
    },
    messages: {
      nonRelativeImport: 'Import should not use own package name',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
