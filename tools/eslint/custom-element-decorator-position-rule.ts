import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['ClassDeclaration > Decorator[expression.callee.name="customElement"]'](
        node: TSESTree.Decorator,
      ) {
        const classParent = node.parent as TSESTree.ClassDeclaration;

        if (classParent.decorators![0] !== node) {
          context.report({
            node: classParent.id ? classParent.id : classParent,
            messageId: 'customElementDecoratorPosition',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        '@customElement decorator must be the first in order before all custom decorators',
    },
    messages: {
      customElementDecoratorPosition:
        '@customElement decorator must be the first in order before all custom decorators',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
