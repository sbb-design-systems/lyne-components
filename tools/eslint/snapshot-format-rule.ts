import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (node.right.type !== 'TemplateLiteral' || node.left.type !== 'MemberExpression') {
          return;
        }

        const object = node.left.object;
        if (object.type !== 'Identifier' || object.name !== 'snapshots') {
          return;
        }

        // Check that there is a space directly after `=`.
        const sourceCode = context.sourceCode;
        const operatorToken = sourceCode.getTokenAfter(node.left);
        const backtickToken = sourceCode.getFirstToken(node.right);

        if (!operatorToken || operatorToken.value !== '=' || !backtickToken) {
          return;
        }

        const textBetween = sourceCode.text.slice(operatorToken.range[1], backtickToken.range[0]);

        if (!textBetween.startsWith(' ')) {
          context.report({
            node,
            messageId: 'snapshotFormatting',
            fix: (fixer) => fixer.insertTextAfterRange(operatorToken.range, ' '),
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        'Snapshot assignments must have exactly one space between `=` and the template literal (i.e. `snapshots["..."] = \\`...\\`).',
    },
    messages: {
      snapshotFormatting:
        'Snapshot assignment must have exactly one space between `=` and the template literal.',
    },
    fixable: 'code',
    type: 'layout',
    schema: [],
    hasSuggestions: false,
  },
});
