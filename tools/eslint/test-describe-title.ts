import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/sbb-design-systems/lyne-components/blob/main/tools/eslint/${name}.ts`,
);

type MessageIds = 'testDescribeTitle';

export const name = 'test-describe-title';
export const rule: TSESLint.RuleModule<MessageIds, never[]> = createRule<never[], MessageIds>({
  create(context) {
    return {
      ['Program > ExpressionStatement > CallExpression > Identifier[name="describe"]'](
        node: TSESTree.Identifier,
      ) {
        const fileName = context.getFilename();
        const expression = node.parent as TSESTree.CallExpression;
        const expressionArguments = expression.arguments;
        const componentName = fileName.match(/\/([^/]+)\/?.spec.ts$/)?.[1]?.match(/^(.*)\./)?.[1];

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
          return context.getSourceCode().text.substring(node.range[0] + 1, node.range[1] - 1);
        }

        const currentTitle =
          titleArgument.type === 'TemplateLiteral'
            ? getTemplateLiteralRawString(titleArgument)
            : titleArgument.value;

        const expectedTitle = fileName.endsWith('ssr.spec.ts')
          ? `sbb-${componentName} \${fixture.name}`
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
  name,
  meta: {
    docs: {
      description: 'describe() title has to be aligned with component name.',
      recommended: 'recommended',
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
