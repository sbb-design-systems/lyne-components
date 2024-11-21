import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

const hasChangedProperties = ['shouldUpdate', 'willUpdate', 'update', 'firstUpdated', 'updated'];
const methodsToCheckForSuperCall = [
  'connectedCallback',
  'disconnectedCallback',
  'requestUpdate',
  'performUpdate',
  ...hasChangedProperties,
];

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      MethodDefinition(methodDefinitionNode) {
        if (
          methodDefinitionNode.key.type === 'Identifier' &&
          methodsToCheckForSuperCall.includes(methodDefinitionNode.key.name)
        ) {
          const name = methodDefinitionNode.key.name;
          const hasSuperCall = methodDefinitionNode.value.body?.body?.some(
            (node: TSESTree.Statement) => {
              if (
                node.type === 'ExpressionStatement' &&
                node.expression.type === 'CallExpression' &&
                node.expression.callee.type === 'MemberExpression' &&
                node.expression.callee.property.type === 'Identifier'
              ) {
                const memberExpression = node.expression.callee;
                return (
                  (memberExpression.property as TSESTree.Identifier).name === name &&
                  memberExpression.object.type === 'Super'
                );
              }
            },
          );

          if (!hasSuperCall) {
            context.report({
              node: methodDefinitionNode,
              messageId: 'needsSuperCall',
              suggest: [
                {
                  messageId: 'needsSuperCallSuggestion',
                  data: {
                    name: name,
                    params: hasChangedProperties.includes(name) ? 'changedProperties' : '',
                  },
                  fix: (fixer) =>
                    fixer.insertTextBefore(
                      methodDefinitionNode.value.body!.body![0],
                      `super.${name}(${hasChangedProperties.includes(name) ? 'changedProperties' : ''});\n\n    `,
                    ),
                },
              ],
            });
          }
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'method needs super call',
    },
    messages: {
      needsSuperCall: 'Method needs super call.',
      needsSuperCallSuggestion: 'Insert super call: super.{{ name }}({{ params }});',
    },
    type: 'problem',
    schema: [],
    hasSuggestions: true,
  },
  defaultOptions: [],
});
