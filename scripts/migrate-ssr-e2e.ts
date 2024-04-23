/* eslint-disable import-x/default, import-x/no-named-as-default-member */
import { readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join, relative } from 'path';

import * as glob from 'glob';
// eslint-disable-next-line @typescript-eslint/naming-convention
import MagicString from 'magic-string';
import ts from 'typescript';

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

const testingDir = new URL('../src/components/core/testing', import.meta.url).pathname;
const e2eFiles = glob.sync('**/*.e2e.ts', { cwd: new URL('..', import.meta.url), absolute: true });
const componentIndexes = glob
  .sync('src/components/**/index.ts', { cwd: new URL('..', import.meta.url), absolute: true })
  .filter((f) => !f.includes('/components/core/'))
  .sort()
  .sort((a, b) => b.length - a.length);
for (const file of e2eFiles) {
  const fileDir = dirname(file);
  const content = readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ES2021, true);

  const imports: ts.ImportDeclaration[] = [];
  const fixtureUsages: ts.CallExpression[] = [];
  let testingImport: ts.ImportDeclaration | null = null;
  let wcFixture: ts.ImportSpecifier | null = null;
  for (const node of iterate(sourceFile)) {
    if (ts.isImportDeclaration(node)) {
      if (node.moduleSpecifier.getText() === `'@open-wc/testing'`) {
        wcFixture =
          (node.importClause?.namedBindings as ts.NamedImports).elements.find(
            (e) => e.name.getText() === 'fixture',
          ) ?? null;
      } else if (node.moduleSpecifier.getText().endsWith(`/core/testing'`)) {
        testingImport = node;
      } else if (
        !node.moduleSpecifier.getText().includes('/core/') &&
        node.moduleSpecifier.getText().startsWith(`'.`) &&
        (!node.importClause || !node.importClause.isTypeOnly)
      ) {
        imports.push(node);
      }
    } else if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.getText() === 'fixture'
    ) {
      fixtureUsages.push(node);
    }
  }

  if (wcFixture) {
    const newContent = new MagicString(content);
    newContent.remove(wcFixture.getStart(), wcFixture.getStart() + wcFixture.getWidth());
    newContent.replaceAll(
      /\ndescribe\(['"`]([^'"`]+)['"`]/g,
      (_, m) => `\ndescribe(\`${m} with \${fixture.name}\``,
    );
    if (testingImport) {
      newContent.appendRight(
        testingImport.importClause!.getStart() + testingImport.importClause!.getWidth() - 1,
        ', fixture',
      );
    } else {
      const reverseImports = imports.slice().reverse();
      const lastRelativeImport =
        reverseImports.find((i) => i.moduleSpecifier.getText().startsWith(`'..`)) ??
        reverseImports.find((i) => i.moduleSpecifier.getText().startsWith(`'.`))!;
      newContent.appendRight(
        lastRelativeImport.getStart() + lastRelativeImport.getWidth(),
        `\nimport { fixture } from '${relative(file, testingDir)}';`,
      );
    }

    const missingImports = new Set<string>();
    for (const fixture of fixtureUsages) {
      const usedElements = [...fixture.arguments[0].getText().matchAll(/<sbb-([^\s>]+)/g)]
        .map((m) => m[1])
        .filter((v, i, a) => a.indexOf(v) === i);
      const importPaths = usedElements
        .map((e) => componentIndexes.find((i) => i.endsWith(`/${e}/index.ts`))!)
        .map((path) => {
          do {
            const shortPath = join(dirname(dirname(path)), 'index.ts');
            if (
              fileDir === dirname(path) ||
              !componentIndexes.includes(shortPath) ||
              relative(fileDir, shortPath).length > relative(fileDir, path).length ||
              ['..', '../index.ts'].includes(relative(fileDir, shortPath))
            ) {
              const relPath = relative(fileDir, path);
              return `'${relPath.startsWith('.') ? relPath : `./${basename(dirname(file))}.ts`}'`;
            }

            path = shortPath;
            // eslint-disable-next-line no-constant-condition
          } while (true);
        });

      importPaths
        .map((i) => i.replace(/.ts'$/, `'`).replace(/\/index'$/, `'`))
        .filter((ip) => imports.every((i) => i.moduleSpecifier.getText() !== ip))
        .forEach((i) => missingImports.add(i));

      newContent.appendRight(
        fixture!.getStart() + fixture!.getWidth() - 1,
        `, { modules: [${importPaths.join(', ')}] }`,
      );
    }
    if (missingImports.size) {
      console.log(
        `${file} is missing imports:\n${[...missingImports].map((i) => `- ${i}\n`).join('')}\n`,
      );
    }

    writeFileSync(file, newContent.toString(), 'utf8');
  }
}

console.log('Done');
