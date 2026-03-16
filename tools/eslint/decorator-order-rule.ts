import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

const accessorDecoratorOrder = [
  'idReference',
  'forceType',
  'plainDate',
  'handleDistinctChange',
  'property',
  'state',
  'getOverride',
];
const getDecoratorName = (node: TSESTree.Decorator): string =>
  node.expression.type === 'CallExpression'
    ? (node.expression.callee as TSESTree.Identifier).name
    : (node.expression as TSESTree.Identifier).name;

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AccessorProperty(node) {
        if (!node.decorators.length) {
          return;
        }
        const decorators = node.decorators;
        const decoratorNames = decorators.map(getDecoratorName);
        for (const decoratorName of decoratorNames) {
          if (!accessorDecoratorOrder.includes(decoratorName)) {
            throw new Error(`Accessor decorator ${decoratorName} is not in order list!`);
          }
        }
        const actualOrder = decoratorNames.filter((n) => accessorDecoratorOrder.includes(n));
        const expectedOrder = accessorDecoratorOrder.filter((n) => decoratorNames.includes(n));
        if (actualOrder.some((v, i) => expectedOrder[i] !== v)) {
          const decoratorCodeMap = decorators.reduce(
            (current, next) =>
              current.set(getDecoratorName(next), context.sourceCode.getText(next)),
            new Map<string, string>(),
          );
          const code = expectedOrder.map((d) => decoratorCodeMap.get(d)!).join('\n');
          context.report({
            node,
            messageId: 'accessorDecoratorOrder',
            fix: (fixer) =>
              decorators.map((d) => fixer.remove(d)).concat(fixer.insertTextBefore(node, code)),
          });
        }
      },
    };
  },
  meta: {
    messages: {
      accessorDecoratorOrder: `Accessor decorator order must be ${[...accessorDecoratorOrder].join(' > ')}`,
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
