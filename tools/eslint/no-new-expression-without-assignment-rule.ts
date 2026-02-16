import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['ExpressionStatement > NewExpression'](node: TSESTree.Identifier) {
        context.report({
          node,
          messageId: 'noNewExpressionWithoutAssignment',
        });
      },
    };
  },
  meta: {
    docs: {
      description:
        'Class instantiation without any assignment should be avoided. For controllers, use the addController() method.',
    },
    messages: {
      noNewExpressionWithoutAssignment:
        'Class instantiation without any assignment should be avoided. For controllers, use the addController() method.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
