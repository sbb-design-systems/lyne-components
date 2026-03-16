import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ClassDeclaration(node: TSESTree.ClassDeclaration) {
        // Check if class has a static elementName property
        const hasElementName = node.body.body.some(
          (member) =>
            member.type === AST_NODE_TYPES.PropertyDefinition &&
            member.key.type === AST_NODE_TYPES.Identifier &&
            member.key.name === 'elementName' &&
            member.static,
        );

        // Only check classes that have elementName property
        if (!hasElementName) {
          return;
        }

        const className = node.id?.name;

        if (!className || !className.startsWith('Sbb') || !className.endsWith('Element')) {
          context.report({
            node: node.id ? node.id : node,
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
