/* eslint-disable @typescript-eslint/naming-convention */
import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import { parse, stringify } from 'comment-parser';
import type { Block } from 'comment-parser/primitives';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const isComponentClass = (node: TSESTree.ClassDeclaration): boolean =>
      node.body.body.some(
        (member) =>
          member.type === AST_NODE_TYPES.PropertyDefinition &&
          member.static &&
          member.key.type === AST_NODE_TYPES.Identifier &&
          member.key.name === 'elementName',
      );
    const findParent = <T extends TSESTree.Node>(
      node: TSESTree.Node | undefined,
      type: keyof typeof TSESTree.AST_NODE_TYPES,
    ): T | null => {
      while (node && node.type !== (type as string)) {
        node = node.parent;
      }
      return (node as unknown as T) ?? null;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const findJsDoc = (node: TSESTree.Node | undefined) => {
      const classDeclaration = findParent<TSESTree.ClassDeclaration>(node, 'ClassDeclaration');
      if (!classDeclaration) {
        return null;
      }
      const jsDoc = context.sourceCode.getCommentsBefore(classDeclaration)[0];
      return jsDoc ? { jsDoc, parsedJsDoc: parse(`/*${jsDoc.value}*/`)?.[0] ?? null } : null;
    };

    const events = new Map<string, { type: string; doc: string }>();
    let jsDoc: TSESTree.Comment | null = null;

    return {
      ClassDeclaration(node) {
        if (isComponentClass(node)) {
          for (const commentNode of [node, node.parent]) {
            jsDoc = context.sourceCode.getCommentsBefore(commentNode)[0];
            if (jsDoc) {
              return;
            }
          }
        }
      },
      NewExpression(node) {
        if (node.callee.type !== 'Identifier') {
          return;
        } else if (node.callee.name.endsWith('Event')) {
          const jsDoc = findJsDoc(node);
          if (!jsDoc) {
            return;
          }
        }
      },
      'ClassDeclaration:exit'(node: TSESTree.ClassDeclaration) {
        if (!isComponentClass(node)) {
          return;
        }
        const insertTarget =
          node.parent.type === AST_NODE_TYPES.ExportNamedDeclaration ? node.parent : node;
        const eventDocs = Array.from(events)
          .map(([name, details]) => `\n * @event ${details.type} ${name} - ${details.doc}`)
          .join('');
        if (!jsDoc) {
          context.report({
            messageId: 'missingJsDoc',
            node,
            fix(fixer) {
              return fixer.insertTextBefore(
                insertTarget,
                `/**
 * TODO: Document me${eventDocs}
 */\n`,
              );
            },
          });
          return;
        }

        const malformedJsDoc = !jsDoc.value.startsWith('*');
        if (malformedJsDoc) {
          context.report({
            messageId: 'malformedJsDoc',
            node,
            fix(fixer) {
              return fixer.insertTextBefore(jsDoc!, '*');
            },
          });
        }
        const parsedJsDoc: Block = malformedJsDoc
          ? parse(`/**${jsDoc.value}*/`)[0]
          : parse(`/*${jsDoc.value}*/`)[0];
        if (!parsedJsDoc) {
          context.report({
            messageId: 'malformedJsDoc',
            node,
          });
          return;
        }

        const jsDocEvents = parsedJsDoc.tags.filter((t) => t.tag === 'event').map((t) => t.name);
        const missingEvents = Array.from(events.keys()).filter((k) => !jsDocEvents.includes(k));
        if (!missingEvents.length) {
          return;
        }
        context.report({
          messageId: 'missingEventDocs',
          data: { eventNames: missingEvents.join(', ') },
          node,
          fix(fixer) {
            if (
              missingEvents.some((e) =>
                parsedJsDoc.tags.find((t) => t.tag === 'event' && t.name === e),
              )
            ) {
              return null;
            }
            const l = parsedJsDoc.source.length;
            parsedJsDoc.source = [
              ...parsedJsDoc.source.slice(0, l - 1),
              ...missingEvents
                .map((name) => ({ ...events.get(name)!, name }))
                .map((e) => ({
                  number: -1,
                  source: '',
                  tokens: {
                    delimiter: '*',
                    description: `- ${e.doc}`,
                    end: '',
                    lineEnd: '',
                    name: e.name,
                    postDelimiter: ' ',
                    postName: ' ',
                    postTag: ' ',
                    postType: ' ',
                    start: ' ',
                    tag: '@event',
                    type: e.type,
                  },
                })),
              parsedJsDoc.source[l - 1],
            ];
            return fixer.replaceText(jsDoc!, stringify(parsedJsDoc));
          },
        });
      },
    };
  },
  meta: {
    docs: {
      description: 'Components should have jsdoc documentation.',
    },
    messages: {
      missingJsDoc: 'jsdoc is missing',
      malformedJsDoc: 'jsdoc is malformed',
      missingEventDocs: 'Event documentation is missing for {{ eventNames }}',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
