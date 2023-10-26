import MagicString from 'magic-string';
import glob from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';
import ts from 'typescript';

const componentsRoot = new URL('../src/components', import.meta.url);
const files = glob.sync('**/*.tsx', { absolute: true, cwd: componentsRoot.pathname });

for (const file of files.filter((f) => !f.includes('.stories.tsx'))) {
  const content = readFileSync(file, 'utf8');
  const magicString = new MagicString(content, { filename: file });
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ES2021, true);

  const className = basename(file, '.tsx')
    .replace(/^\w/, (m) => m.toUpperCase())
    .replace(/-\w/g, (m) => m[1].toUpperCase());

  let events: ts.VariableDeclaration | null = null;
  const eventUsages: ts.PropertyAccessExpression[] = [];
  let styles: ts.PropertyDeclaration | null = null;
  for (const node of iterateNodes(sourceFile)) {
    if (ts.isVariableDeclaration(node) && node.name.getText() === 'events') {
      events = node;
    } else if (ts.isPropertyDeclaration(node) && node.name.getText() === 'styles') {
      styles = node;
    } else if (ts.isPropertyAccessExpression(node) && node.expression.getText() === 'events') {
      eventUsages.push(node);
    }
  }

  if (!events) {
    console.log(file);
    continue;
  }

  magicString.remove(events.parent.getStart(), events.parent.getStart() + events.parent.getWidth());
  const exportKeyword = (events.parent.parent as ts.VariableStatement).modifiers![0]!;
  magicString.remove(exportKeyword.getStart(), exportKeyword.getStart() + exportKeyword.getWidth());
  magicString.appendRight(
    styles!.getStart() + styles!.getWidth(),
    `\n  public static readonly ${events.getText()} as const`,
  );
  for (const node of eventUsages) {
    magicString.appendRight(node.getStart(), `${className}.`);
  }

  writeFileSync(file, magicString.toString(), 'utf8');

  for (const fileEnding of ['.stories.tsx', '.spec.ts', '.e2e.ts']) {
    const relFile = file.replace(/.tsx$/, fileEnding);
    const relContent = readFileSync(relFile, 'utf8');
    const relMagicString = new MagicString(relContent, { filename: relFile });
    const relSourceFile = ts.createSourceFile(relFile, relContent, ts.ScriptTarget.ES2021, true);

    let eventsImport: ts.ImportSpecifier | null = null;
    let bareImport: ts.ImportDeclaration | null = null;
    let hasClassImport = false;
    const storiesEventUsages: ts.PropertyAccessExpression[] = [];
    for (const node of iterateNodes(relSourceFile)) {
      if (
        ts.isImportSpecifier(node) &&
        node.name.getText() === 'events' &&
        node.parent.parent.parent.moduleSpecifier.getText().startsWith(`'./`)
      ) {
        eventsImport = node;
      } else if (
        ts.isImportSpecifier(node) &&
        node.name.getText() === className &&
        node.parent.parent.parent.moduleSpecifier.getText().startsWith(`'./`)
      ) {
        hasClassImport = true;
      } else if (
        ts.isImportDeclaration(node) &&
        !node.importClause &&
        node.moduleSpecifier.getText().startsWith(`'./`)
      ) {
        bareImport = node;
      } else if (ts.isPropertyAccessExpression(node) && node.expression.getText() === 'events') {
        storiesEventUsages.push(node);
      }
    }

    if (!eventsImport) {
      continue;
    }

    if (hasClassImport) {
      relMagicString.remove(
        eventsImport.getStart(),
        eventsImport.getStart() + eventsImport.getWidth(),
      );
    } else {
      relMagicString.remove(
        eventsImport.getStart(),
        eventsImport.getStart() + eventsImport.getWidth(),
      );
      relMagicString.appendRight(eventsImport.getStart(), className);
      if (bareImport) {
        relMagicString.remove(bareImport.getStart(), bareImport.getStart() + bareImport.getWidth());
      }
    }
    for (const node of storiesEventUsages) {
      relMagicString.appendRight(node.getStart(), `${className}.`);
    }

    writeFileSync(relFile, relMagicString.toString(), 'utf8');
  }
}

function* iterateNodes(originNode: ts.Node) {
  const nodes: ts.Node[] = [];
  ts.forEachChild(originNode, (n) => {
    // Must not return a number, so this is wrapped in a function body.
    nodes.push(n);
  });
  for (const node of nodes) {
    yield node;
    yield* iterateNodes(node);
  }
}
