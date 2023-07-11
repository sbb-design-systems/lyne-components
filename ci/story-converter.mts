/* eslint-disable no-unused-vars */
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import ts from 'typescript';

const componentsRoot = new URL('../src', import.meta.url);
const stories = glob.sync('**/*.stories.jsx', { absolute: true, cwd: componentsRoot });
const typeImports = `
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';`;

class StringMutation {
  private _mutations: {
    position: number;
    type: 'insert' | 'delete';
    mutate: (result: string) => string;
  }[] = [];
  constructor(private readonly _sourceFile: ts.SourceFile) {}

  insertAt(position: number, text: string) {
    this._mutations.push({
      position,
      type: 'insert',
      mutate: (result) => `${result.substring(0, position)}${text}${result.substring(position)}`,
    });
  }

  insertAtEnd(node: ts.Node, text: string) {
    this.insertAt(node.getFullStart() + node.getFullWidth(), text);
  }

  remove(...nodes: ts.Node[]) {
    for (const node of nodes) {
      this._mutations.push({
        position: node.getStart(),
        type: 'delete',
        mutate: (result) =>
          `${result.substring(0, node.getStart())}${result.substring(
            node.getStart() + node.getWidth(),
          )}`,
      });
    }
  }

  toString(): string {
    return this._mutations
      .sort((a, b) => b.position - a.position || a.type.localeCompare(b.type))
      .reduce((current, next) => next.mutate(current), this._sourceFile.getFullText());
  }
}

function convert() {
  for (const storyFile of stories) {
    const content = readFileSync(storyFile, 'utf8');
    const sourceFile = ts.createSourceFile(storyFile, content, ts.ScriptTarget.ES2020, true);
    const targetFile = new StringMutation(sourceFile);
    targetFile.insertAt(0, '/** @jsx h */\n');

    let lastImport: ts.ImportDeclaration;
    const argNames: string[] = [];
    const argTypeNames: string[] = [];

    sourceFile.statements.forEach((node, nodeIndex) => {
      if (ts.isImportDeclaration(node)) {
        lastImport = node;
        if (node.moduleSpecifier.getText() == `'jsx-dom'`) {
          targetFile.insertAtEnd(
            (node.importClause!.namedBindings as ts.NamedImports).elements.at(-1)!,
            ', JSX',
          );
        }
      } else if (ts.isVariableStatement(node)) {
        if (node.declarationList.declarations.length !== 1) {
          throw new Error(
            `Failed due to multiple declarations at ${storyFile}:${ts.getLineAndCharacterOfPosition(
              sourceFile,
              node.pos,
            )}`,
          );
        }
        const declaration = node.declarationList.declarations[0];
        const initializer = declaration.initializer as ts.ObjectLiteralExpression;
        const ifInitializer = (check: (i: ts.ObjectLiteralExpression) => boolean) =>
          initializer && ts.isObjectLiteralExpression(initializer) && check(initializer);
        if (node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
          const name = (declaration.name as ts.Identifier).escapedText as string;
          const templateExpression = (initializer as unknown as ts.CallExpression)
            .expression as ts.PropertyAccessExpression;
          if (templateExpression.name?.escapedText.toString() !== 'bind') {
            throw new Error(
              `Failed due to template used without .bind({}) at ${storyFile}:${ts.getLineAndCharacterOfPosition(
                sourceFile,
                node.pos,
              )}`,
            );
          }
          const template = (templateExpression.expression as ts.Identifier).escapedText.toString();
          const relatedExpressions = sourceFile.statements
            .slice(nodeIndex)
            .filter(
              (n): n is ts.ExpressionStatement =>
                ts.isExpressionStatement(n) &&
                ts.isBinaryExpression(n.expression) &&
                ts.isPropertyAccessExpression(n.expression.left) &&
                ts.isIdentifier(n.expression.left.expression) &&
                n.expression.left.expression.escapedText.toString() === name,
            );

          const options = relatedExpressions
            .filter(
              (n) =>
                ts.isExpressionStatement(n) &&
                ts.isBinaryExpression(n.expression) &&
                ts.isPropertyAccessExpression(n.expression.left) &&
                ts.isIdentifier(n.expression.left.expression) &&
                n.expression.left.name.escapedText.toString() !== 'documentation',
            )
            .map((n) => {
              const expression = n.expression as ts.BinaryExpression;
              const property = (
                expression.left as ts.PropertyAccessExpression
              ).name.escapedText.toString();
              const value = expression.right.getText();
              return { property, value };
            });
          options.unshift({ property: 'render', value: template });
          targetFile.remove(node, ...relatedExpressions);
          targetFile.insertAt(
            node.getStart(),
            `export const ${name}: StoryObj = {${options
              .map((o) => `\n  ${o.property}: ${o.value},`)
              .join('')}\n};`,
          );
        } else if (ifInitializer((i) => !!i.getFullText().match(/\Wcontrol:/))) {
          targetFile.insertAtEnd(declaration.name, `: InputType`);
          argNames.push((declaration.name as ts.Identifier).escapedText as string);
        } else if (
          ifInitializer((i) =>
            i.properties.some((p) =>
              argNames.includes(
                ts.isShorthandPropertyAssignment(p)
                  ? (p.name.escapedText as string)
                  : ts.isPropertyAssignment(p) && ts.isIdentifier(p.initializer)
                  ? (p.initializer.escapedText as string)
                  : '',
              ),
            ),
          )
        ) {
          targetFile.insertAtEnd(declaration.name, `: ArgTypes`);
          argTypeNames.push(
            ...initializer.properties
              .map((p) =>
                ts.isShorthandPropertyAssignment(p)
                  ? (p.name.escapedText as string)
                  : ts.isPropertyAssignment(p) && ts.isStringLiteralLike(p.name)
                  ? p.name.text
                  : '',
              )
              .filter((v) => !!v),
          );
        } else if (ifInitializer((i) => i.properties.every((p) => ts.isPropertyAssignment(p)))) {
          targetFile.insertAtEnd(declaration.name, `: Args`);
        } else if (declaration.initializer && ts.isArrowFunction(declaration.initializer)) {
          if (
            ts.isArrayLiteralExpression(declaration.initializer.body) &&
            declaration.initializer.body.elements.every((e) => ts.isJsxElement(e))
          ) {
            targetFile.insertAt(
              declaration.initializer.equalsGreaterThanToken.getFullStart(),
              ': JSX.Element[]',
            );
          } else if (
            ts.isParenthesizedExpression(declaration.initializer.body) &&
            ts.isJsxElement(declaration.initializer.body.expression)
          ) {
            targetFile.insertAt(
              declaration.initializer.equalsGreaterThanToken.getFullStart(),
              ': JSX.Element',
            );
          }
        }
      } else if (ts.isExportAssignment(node)) {
        targetFile.remove(node);
        let declaration = node.expression.getFullText();
        const inlineStoryMatch = declaration.match(/inlineStories: \w+,/);
        if (inlineStoryMatch) {
          declaration = declaration.replace(inlineStoryMatch[0], '');
        }
        const iframeHeightMatch = declaration.match(/iframeHeight: '\w+',/);
        if (iframeHeightMatch) {
          declaration = declaration.replace(iframeHeightMatch[0], '');
        }
        if (inlineStoryMatch || iframeHeightMatch) {
          const index = Math.min(
            inlineStoryMatch?.index ?? Number.MAX_SAFE_INTEGER,
            iframeHeightMatch?.index ?? Number.MAX_SAFE_INTEGER,
          );
          const insert = [
            inlineStoryMatch?.[0].replace('inlineStories', 'inline'),
            iframeHeightMatch?.[0],
          ]
            .filter((i) => i)
            .join(' ');
          declaration = `${declaration.substring(
            0,
            index,
          )}story: { ${insert} },${declaration.substring(index)}`;
        }

        targetFile.insertAt(
          node.getStart(),
          `const meta: Meta = ${declaration};\n\nexport default meta;`,
        );
      }
    });

    if (lastImport!) {
      targetFile.insertAtEnd(lastImport, typeImports);
    }

    const tsxStory = storyFile.replace(/jsx$/, 'tsx');
    writeFileSync(
      tsxStory,
      targetFile
        .toString()
        .replace(/withActions,/g, 'withActions as Decorator,')
        .replace(/style=("[^"]+"|\{[^}]+})/g, (m, m1: string) => {
          if (
            m1.startsWith('"') ||
            m1.startsWith(`{'`) ||
            (m1.startsWith('{`') && !m1.includes('$'))
          ) {
            const style = m1.replace(/(^\{?("|'|`)|("|'|`)\}?$)/g, '');
            return `style={{${style
              .split(';')
              .map((s) => s.trim())
              .filter((s) => !!s)
              .map((s) => {
                const [property, value] = s.split(':', 1).map((s) => s.trim());
                return `${property.includes('-') ? `'${property}'` : property}: '${value}'`;
              })
              .join(', ')}}}`;
          }

          return m;
        }),
      'utf8',
    );
    console.log(`Created ${tsxStory}`);
  }
}

convert();
