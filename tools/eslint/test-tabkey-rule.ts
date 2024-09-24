import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['CallExpression > Identifier[name="sendKeys"]'](node: TSESTree.Identifier) {
        const callExpression = node.parent as TSESTree.CallExpression;
        const callExpressionArguments = callExpression.arguments;
        if (
          !callExpressionArguments.length &&
          callExpressionArguments[0].type !== 'ObjectExpression'
        ) {
          return;
        }

        const firstArgumentProps = (callExpressionArguments[0] as TSESTree.ObjectExpression)
          .properties;
        if (!firstArgumentProps.length || firstArgumentProps[0].type !== 'Property') {
          return;
        }

        const firstArgument = firstArgumentProps[0] as TSESTree.Property;
        const propKey = (firstArgument.key as TSESTree.Identifier).name;
        const propValue = firstArgument.value;
        if (propValue.type !== 'Literal' || propKey !== 'press') {
          return;
        }

        if (propValue.value === 'Tab') {
          context.report({
            node,
            messageId: 'testTabKey',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Avoid using `Tab`, use provided `tabKey` constant instead.',
    },
    messages: {
      testTabKey: 'Avoid using `Tab`, use provided `tabKey` constant instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
