import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['ClassDeclaration > Decorator[expression.callee.name="customElement"]'](
        node: TSESTree.Decorator,
      ) {
        const isClassDeclaration = (node: TSESTree.Node): node is TSESTree.ClassDeclaration => {
          return node.type === AST_NODE_TYPES.ClassDeclaration;
        };

        const getClassName = (node: TSESTree.Node): string | undefined => {
          if (isClassDeclaration(node)) {
            return node.id?.name;
          }
          if (node.parent) {
            return getClassName(node.parent);
          }
          return undefined;
        };

        const classParent = node.parent as TSESTree.ClassDeclaration;
        const className = getClassName(classParent);

        if (!className || !className.startsWith('Sbb') || !className.endsWith('Element')) {
          context.report({
            node: classParent.id ? classParent.id : classParent,
            messageId: 'customElementClassName',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Components class name should start with `Sbb` and end with `Element`',
    },
    messages: {
      customElementClassName:
        'Components class name should start with `Sbb` and end with `Element`',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
