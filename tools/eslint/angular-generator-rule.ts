/* eslint-disable import-x/no-named-as-default-member */
/* eslint-disable @typescript-eslint/naming-convention */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
// eslint-disable-next-line import-x/default
import ts from 'typescript';

const srcPath = fileURLToPath(new URL('../../src/', import.meta.url));
const getAngularPairFile = (filename: string): string | null => {
  const relativePath = relative(srcPath, filename);
  const maybePairedFile = join(srcPath, relativePath.replace(/^angular/, 'elements'));
  return ['.spec.', '.stories.'].every((s) => !filename.includes(s)) &&
    relativePath.startsWith('angular') &&
    existsSync(maybePairedFile)
    ? maybePairedFile
    : null;
};
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
const isPublic = (
  m:
    | ts.PropertyDeclaration
    | ts.MethodDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration,
): boolean =>
  !m.modifiers ||
  m.modifiers.every(
    (k) =>
      ![
        ts.SyntaxKind.StaticKeyword,
        ts.SyntaxKind.ProtectedKeyword,
        ts.SyntaxKind.PrivateKeyword,
      ].includes(k.kind),
  );
const isPublicProperty = (m: ts.ClassElement): m is ts.PropertyDeclaration =>
  ts.isPropertyDeclaration(m) && isPublic(m);
const isPublicMethod = (m: ts.ClassElement): m is ts.MethodDeclaration =>
  ts.isMethodDeclaration(m) && isPublic(m);
const isPublicSetterGetter = (m: ts.ClassElement): m is ts.GetAccessorDeclaration | ts.SetAccessorDeclaration =>
  (ts.isSetAccessor(m) || ts.isGetAccessor(m)) && isPublic(m);

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['ClassDeclaration > Decorator[expression.callee.name="customElement"]'](
        _node: TSESTree.Decorator,
      ) {
        const relativePath = relative(srcPath, context.filename);
        if (
          ['.spec.', '.stories.'].some((s) => context.filename.includes(s)) ||
          !relativePath.startsWith('elements')
        ) {
          return;
        }

        const targetPath = join(srcPath, relativePath.replace(/^elements/, 'angular'));
        const directory = dirname(targetPath);
        const ngPackagePath = join(directory, 'ng-package.json');
        const indexPath = join(directory, 'index.ts');

        // eslint does not allow creating other files, so we do it manually
        mkdirSync(directory, { recursive: true });
        if (!existsSync(targetPath)) {
          writeFileSync(targetPath, '', 'utf8');
        }

        if (!existsSync(ngPackagePath)) {
          const content = `{\n  "lib": {\n    "entryFile": "index.ts"\n  }\n}\n`;
          writeFileSync(ngPackagePath, content, 'utf8');
        }

        if (!existsSync(indexPath)) {
          const content = `export * from './${basename(targetPath).replace(/\.ts$/, '')}';\n`;
          writeFileSync(indexPath, content, 'utf8');
        }
      },
      Program(node) {
        const originFile = getAngularPairFile(context.filename);
        if (!originFile) {
          return;
        }

        const content = readFileSync(originFile, 'utf8');
        const classMatches = Array.from(content.matchAll(/class (Sbb\w+)Element/g));
        if (classMatches.length && node.body.every((n) => n.type !== 'ImportDeclaration')) {
          context.report({
            node,
            messageId: 'angularMissingImport',
            data: { symbol: 'Directive' },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `import { Directive } from '@angular/core';\n`),
          });
        }
        for (const match of classMatches) {
          const className = match[1];
          if (
            node.body.every(
              (n) =>
                n.type !== 'ExportNamedDeclaration' ||
                !n.declaration ||
                n.declaration.type !== 'ClassDeclaration' ||
                n.declaration.id?.name !== className,
            )
          ) {
            context.report({
              node,
              messageId: 'angularMissingDirective',
              data: { className },
              fix: (fixer) =>
                fixer.insertTextAfter(
                  node,
                  `
@Directive({
  selector: '${toKebabCase(className)}',
})
export ${className} {
}`,
                ),
            });
          }
        }

        console.log(node);
      },
      ['ClassDeclaration > Decorator[expression.callee.name="Directive"]'](
        node: TSESTree.Decorator,
      ) {
        const originFile = getAngularPairFile(context.filename);
        if (!originFile) {
          return;
        }

        const classDeclaration = node.parent as TSESTree.ClassDeclaration;
        const elementClassName = `${classDeclaration.id!.name}Element`;
        const sourceFile = ts.createSourceFile(
          originFile,
          readFileSync(originFile, 'utf8'),
          ts.ScriptTarget.ES2022,
          true,
        );

        const originClass = sourceFile.statements.find(
          (s): s is ts.ClassDeclaration =>
            ts.isClassDeclaration(s) && s.name?.escapedText === elementClassName,
        );
        if (!originClass) {
          return;
        }

        const expectedAngularImports = new Set<string>();
        const publicProperties = originClass.members.filter(isPublicProperty);
        const publicSetterGetter = originClass.members.filter(isPublicSetterGetter);
        const publicMethods = originClass.members.filter(isPublicMethod);
        if (publicProperties.length ||publicSetterGetter.length || publicMethods.length) {
          expectedAngularImports.add('ElementRef').add('inject');
        }
        if (
          publicProperties.some((p) =>
            p.modifiers?.some((m) => ts.isDecorator(m) && m.getText().includes('@property')),
          )
        ) {
          expectedAngularImports.add('Input').add('NgZone');
        }

        for (const member of publicProperties) {
          // Add getter/setter
        }

        for (const member of publicSetterGetter) {
          // Add getter or setter
        }

        for (const member of publicMethods) {
          // Add getter or setter
        }

        const program = context.sourceCode.ast;

        // Add necessary Angular imports
        if (
          !program.body.find(
            (n) => n.type === 'ImportDeclaration' && n.source.value === '@angular/core',
          )
        ) {
          const imports = Array.from(expectedAngularImports).sort().join(', ');
          context.report({
            node: program,
            messageId: 'angularMissingImport',
            data: { symbol: imports },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `import { ${imports} } from '@angular/core';\n`),
          });
        }

        const elementImport = `@sbb-esta/${relative(srcPath, dirname(originFile))}.js`;

        // Add type import for the element class
        if (
          expectedAngularImports.has('ElementRef') &&
          program.body.every(
            (n) =>
              n.type !== 'ImportDeclaration' ||
              n.importKind !== 'type' ||
              n.source.value !== elementImport,
          )
        ) {
          const lastImport = program.body
            .filter((n) => n.type === 'ImportDeclaration' && n.specifiers.length)
            .at(-1)!;
          context.report({
            node: lastImport,
            messageId: 'angularMissingImport',
            data: { symbol: elementClassName },
            fix: (fixer) =>
              fixer.insertTextAfter(
                lastImport,
                `\nimport type { ${elementClassName} } from '${elementImport}';\n`,
              ),
          });
        }

        // Add side effect import for the element
        if (
          program.body.every(
            (n) =>
              n.type !== 'ImportDeclaration' ||
              n.importKind !== 'value' ||
              n.source.value !== elementImport,
          )
        ) {
          const lastImport = program.body.filter((n) => n.type === 'ImportDeclaration').at(-1)!;
          context.report({
            node: lastImport,
            messageId: 'angularMissingImport',
            data: { symbol: 'element side effect' },
            fix: (fixer) => fixer.insertTextAfter(lastImport, `\nimport '${elementImport}';\n`),
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Generate Angular Wrapper and verify parity.',
    },
    messages: {
      angularMissingImport: 'Missing import {{ symbol }}',
      angularMissingDirective: 'Missing class for {{ className }}',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
