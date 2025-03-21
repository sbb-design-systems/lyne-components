import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

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

const dist = fileURLToPath(import.meta.resolve('../dist/'));
const stats = {
  size: 0,
  cssSize: 0,
  files: {} as Record<string, { size: number; cssSize?: number }>,
};
const themePath = 'elements/standard-theme.css';
const theme = readFileSync(join(dist, themePath), 'utf8');
stats.size += theme.length;
stats.cssSize += theme.length;
stats.files[themePath] = { size: theme.length, cssSize: theme.length };

for (const dir of ['elements', 'elements-experimental'].map((d) =>
  fileURLToPath(import.meta.resolve(`../dist/${d}/`)),
)) {
  for (const file of globSync('**/*.js', { cwd: dir })
    .filter((f) => !f.includes('/development/'))
    .map((f) => join(dir, f))
    .sort()) {
    const key = file.substring(dist.length);
    const content = readFileSync(file, 'utf8');
    stats.size += content.length;
    stats.files[key] = { size: content.length };
    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ES2022, true);

    let cssTaggedName = '';
    let cssSize = 0;
    for (const node of iterate(sourceFile)) {
      if (
        ts.isImportDeclaration(node) &&
        node.moduleSpecifier.getText().slice(1, -1) === 'lit' &&
        node.importClause?.namedBindings &&
        ts.isNamedImports(node.importClause.namedBindings) &&
        node.importClause.namedBindings.elements.length
      ) {
        cssTaggedName =
          node.importClause.namedBindings.elements.find((e) => e.propertyName?.text === 'css')?.name
            ?.text ?? '';
      } else if (
        cssTaggedName &&
        ts.isTaggedTemplateExpression(node) &&
        node.tag.getText() === cssTaggedName
      ) {
        cssSize += node.template.getText().length;
      }
    }

    if (cssSize) {
      stats.cssSize += cssSize;
      stats.files[key].cssSize = cssSize;
    }
  }
}

writeFileSync(
  new URL(import.meta.resolve('../dist/storybook/lyne-stats.json')),
  JSON.stringify(stats, null, 2),
  'utf8',
);
