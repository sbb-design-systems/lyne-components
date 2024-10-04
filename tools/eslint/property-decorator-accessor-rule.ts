import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['PropertyDefinition > Decorator'](node: TSESTree.Decorator) {
        const propertyParent = node.parent as TSESTree.PropertyDefinition;
        context.report({
          node: propertyParent,
          messageId: 'propertyDecoratorAccessorRule',
          fix: (fixer) => fixer.insertTextBefore(propertyParent.key, 'accessor '),
        });
      },
    };
  },
  meta: {
    docs: {
      description: 'Properties with decorators must have an auto accessor',
    },
    messages: {
      propertyDecoratorAccessorRule: 'Properties with decorators must have an auto accessor',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
