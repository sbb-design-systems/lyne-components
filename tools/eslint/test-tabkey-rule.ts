import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sbb-design-systems/lyne-components/blob/main/tools/eslint/${name}.ts`,
);

type MessageIds = 'testTabKey';

export const name = 'test-tab-key';
export const rule: TSESLint.RuleModule<MessageIds, never[]> = createRule<never[], MessageIds>({
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
  name,
  meta: {
    docs: {
      description: 'Avoid using `Tab`, use provided `tabKey` constant instead.',
      recommended: 'recommended',
    },
    messages: {
      testTabKey: 'Avoid using `Tab`, use provided `tabKey` constant instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
