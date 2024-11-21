import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['MemberExpression > Identifier[name="tagName"]'](node: TSESTree.Identifier) {
        if (node.name === 'tagName') {
          context.report({
            node,
            messageId: 'useLocalName',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Avoid using `tagName`, use `localName` instead.',
    },
    messages: {
      useLocalName: 'Avoid using `tagName`, use `localName` instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
