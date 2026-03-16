import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Decorator(node: TSESTree.Decorator) {
        const { expression } = node;

        // Match @customElement('...')
        if (
          expression.type === AST_NODE_TYPES.CallExpression &&
          expression.callee.type === AST_NODE_TYPES.Identifier &&
          expression.callee.name === 'customElement'
        ) {
          context.report({
            node,
            messageId: 'noCustomElementDecorator',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        'Disallow usage of @customElement decorator. Use static `elementName` property and `.define()` instead.',
    },
    messages: {
      noCustomElementDecorator:
        'Do not use @customElement decorator. Use static `elementName` property and `.define()` instead.',
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
