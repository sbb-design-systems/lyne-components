import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['Program > ExpressionStatement > CallExpression > Identifier[name="describe"]'](
        node: TSESTree.Identifier,
      ) {
        const fileName = context.filename;
        const expression = node.parent as TSESTree.CallExpression;
        const expressionArguments = expression.arguments;
        const componentName = fileName.match(/.*\/([^.]+).*\.spec\.ts$/)?.[1];

        if (!componentName || !expressionArguments.length) {
          return;
        }

        const titleArgument = expressionArguments[0] as
          | TSESTree.TemplateLiteral
          | TSESTree.StringLiteral;

        /**
         * Read full TemplateLiteral raw string
         * @param node
         */
        function getTemplateLiteralRawString(node: TSESTree.TemplateLiteral): string {
          return context.sourceCode.text.substring(node.range[0] + 1, node.range[1] - 1);
        }

        const currentTitle =
          titleArgument.type === 'TemplateLiteral'
            ? getTemplateLiteralRawString(titleArgument)
            : titleArgument.value;

        const expectedTitle = fileName.endsWith('ssr.spec.ts')
          ? `sbb-${componentName} ssr`
          : `sbb-${componentName}`;

        if (currentTitle !== expectedTitle) {
          context.report({
            node,
            messageId: 'testDescribeTitle',
            data: {
              currentTitle,
              expectedTitle,
            },
            fix: (fixer) => fixer.replaceTextRange(titleArgument.range, `\`${expectedTitle}\``),
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'describe() title has to be aligned with component name.',
    },
    messages: {
      testDescribeTitle:
        'describe() title `{{ currentTitle }}` has to be aligned with component name and should be `{{ expectedTitle }}`.',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
    hasSuggestions: true,
  },
  defaultOptions: [],
});
