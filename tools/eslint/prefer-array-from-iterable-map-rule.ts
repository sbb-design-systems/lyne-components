import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

/**
 * Detects `Array.from(iterable).map(fn)` and replaces it with `Array.from(iterable, fn)`.
 * The two-argument form of `Array.from` avoids creating an intermediate array.
 */
export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(node) {
        // Match: <something>.map(...)
        if (
          node.callee.type !== 'MemberExpression' ||
          node.callee.property.type !== 'Identifier' ||
          node.callee.property.name !== 'map'
        ) {
          return;
        }

        const mapCallNode = node;
        const mapCallee = node.callee as TSESTree.MemberExpression;
        const arrayFromCall = mapCallee.object;

        // Match: Array.from(...)
        if (
          arrayFromCall.type !== 'CallExpression' ||
          arrayFromCall.callee.type !== 'MemberExpression' ||
          arrayFromCall.callee.object.type !== 'Identifier' ||
          (arrayFromCall.callee.object as TSESTree.Identifier).name !== 'Array' ||
          arrayFromCall.callee.property.type !== 'Identifier' ||
          (arrayFromCall.callee.property as TSESTree.Identifier).name !== 'from' ||
          // Only handle the single-argument form: Array.from(iterable)
          arrayFromCall.arguments.length !== 1 ||
          arrayFromCall.arguments[0].type === 'SpreadElement'
        ) {
          return;
        }

        // Only handle a single mapper argument (no spread)
        if (mapCallNode.arguments.length === 0 || mapCallNode.arguments.length > 2) {
          return;
        }

        context.report({
          node: mapCallNode,
          messageId: 'preferArrayFromMap',
          fix(fixer) {
            const sourceCode = context.sourceCode;
            const iterableText = sourceCode.getText(arrayFromCall.arguments[0]);
            const mapArgsText = mapCallNode.arguments
              .map((arg) => sourceCode.getText(arg))
              .join(', ');

            return fixer.replaceText(mapCallNode, `Array.from(${iterableText}, ${mapArgsText})`);
          },
        });
      },
    };
  },
  meta: {
    docs: {
      description:
        'Prefer `Array.from(iterable, mapFn)` over `Array.from(iterable).map(mapFn)` to avoid an intermediate array.',
    },
    fixable: 'code',
    messages: {
      preferArrayFromMap:
        'Use `Array.from(iterable, mapFn)` instead of `Array.from(iterable).map(mapFn)`.',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
