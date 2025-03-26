import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { brotliCompress, gzip } from 'node:zlib';

import ts from 'typescript';

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

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

async function calculateGzipSize(content: string): Promise<number> {
  return (await gzipAsync(content)).length;
}

async function calculateBrotliSize(content: string): Promise<number> {
  return (await brotliAsync(content)).length;
}

const dist = fileURLToPath(import.meta.resolve('../dist/'));
const stats = {
  jsSize: 0,
  jsBrotliSize: 0,
  jsGzipSize: 0,
  jsCssSize: 0,
  cssSize: 0,
  cssBrotliSize: 0,
  cssGzipSize: 0,
  cssFiles: {} as Record<string, { size: number; gzipSize: number; brotliSize: number }>,
  jsFiles: {} as Record<
    string,
    { size: number; cssSize?: number; gzipSize: number; brotliSize: number }
  >,
};
for (const dir of ['elements', 'elements-experimental'].map((d) =>
  fileURLToPath(import.meta.resolve(`../dist/${d}/`)),
)) {
  for (const file of globSync('**/*.css', { cwd: dir })
    .map((f) => join(dir, f))
    .sort()) {
    const key = file.substring(dist.length);
    const content = readFileSync(file, 'utf8');
    const size = content.length;
    const brotliSize = await calculateBrotliSize(content);
    const gzipSize = await calculateGzipSize(content);
    stats.cssSize += size;
    stats.cssBrotliSize += brotliSize;
    stats.cssGzipSize += gzipSize;
    stats.cssFiles[key] = { size, brotliSize, gzipSize };
  }
  for (const file of globSync('**/*.js', { cwd: dir })
    .filter((f) => !f.startsWith('development/'))
    .map((f) => join(dir, f))
    .sort()) {
    const key = file.substring(dist.length);
    const content = readFileSync(file, 'utf8');
    const size = content.length;
    const brotliSize = await calculateBrotliSize(content);
    const gzipSize = await calculateGzipSize(content);
    stats.jsSize += size;
    stats.jsBrotliSize += brotliSize;
    stats.jsGzipSize += gzipSize;
    stats.jsFiles[key] = { size, brotliSize, gzipSize };
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
      stats.jsCssSize += cssSize;
      stats.jsFiles[key].cssSize = cssSize;
    }
  }
}

mkdirSync(new URL(import.meta.resolve('../dist/storybook/')), { recursive: true });
writeFileSync(
  new URL(import.meta.resolve('../dist/storybook/lyne-stats.json')),
  JSON.stringify(stats, null, 2),
  'utf8',
);
