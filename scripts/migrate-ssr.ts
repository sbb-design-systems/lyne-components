import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'node:fs';

// eslint-disable-next-line @typescript-eslint/naming-convention
import MagicString from 'magic-string';
import * as ts from 'typescript';

/*
 * Convert e2e test files to use the lit fixture, to enable ssr testing.
 */

function* iterate(node: ts.Node): Generator<ts.Node, void, unknown> {
  yield node;
  const childNodes: ts.Node[] = [];
  ts.forEachChild(node, (n) => {
    childNodes.push(n);
  });
  for (const childNode of childNodes) {
    yield* iterate(childNode);
  }
}

const specFiles = globSync('**/*.ssr.spec.ts', {
  cwd: new URL('../src/', import.meta.url),
})
  .filter((f) => !f.includes('/core/') && !f.includes('/storybook/'))
  .sort();
for (const file of specFiles) {
  const content = readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ES2021, true);
  const newSource = new MagicString(content, { filename: sourceFile.fileName });

  try {
    for (const node of iterate(sourceFile)) {
      if (
        ts.isImportDeclaration(node) &&
        node.moduleSpecifier.getText().endsWith(`/testing/private.js'`)
      ) {
        const elements = (node.importClause!.namedBindings as ts.NamedImports).elements;
        if (elements.length > 1) {
          const fixture = elements.find((e) => e.name.getText() === 'fixture')!;
          newSource.remove(fixture.getStart(), fixture.getEnd() + 1);
        } else {
          newSource.remove(node.getStart(), node.getEnd());
        }
        newSource.appendLeft(
          node.getStart(),
          `import { ssrHydratedFixture } from '@lit-labs/testing/fixtures.js';`,
        );
      } else if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.getText() === 'fixture'
      ) {
        newSource.remove(node.expression.getStart(), node.expression.getEnd());
        newSource.appendLeft(node.expression.getStart(), 'ssrHydratedFixture');
      }
    }
  } catch (e) {
    console.log(file);
    throw e;
  }

  writeFileSync(file, newSource.toString(), 'utf8');
}

console.log('Done');
