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
const isPublicSetterGetter = (
  m: ts.ClassElement,
): m is ts.GetAccessorDeclaration | ts.SetAccessorDeclaration =>
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
  standalone: true,
})
export class ${className} {
}`,
                ),
            });
          }
        }
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
        if (publicProperties.length || publicSetterGetter.length || publicMethods.length) {
          expectedAngularImports.add('ElementRef').add('inject');
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== 'PropertyDefinition' ||
                !n.value ||
                !context.sourceCode.getText(n.value).startsWith('inject(ElementRef'),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingElementRef',
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1; // Get the position before the closing brace
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `  #element = inject(ElementRef<${elementClassName}>);\n`,
                );
              },
            });
          }
          if (
            (publicProperties.length || publicSetterGetter.some((p) => ts.isSetAccessor(p))) &&
            classDeclaration.body.body.every(
              (n) =>
                n.type !== 'PropertyDefinition' ||
                !n.value ||
                !context.sourceCode.getText(n.value).startsWith('inject(NgZone'),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingNgZone',
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `  #ngZone = inject(NgZone);\n`,
                );
              },
            });
          }
        }
        if (
          publicProperties.some((p) =>
            p.modifiers?.some((m) => ts.isDecorator(m) && m.getText().includes('@property')),
          )
        ) {
          expectedAngularImports.add('Input').add('NgZone');
        }

        // Getter: this.#element.getter
        // Setter: this.#ngZone.runOutsideAngular(() => this.#element.value = value)
        // Method: this.#element.method(...params)

        // TODO: Add @Input() decorators (with alias and maybe converter)
        // TODO: Events with @Output() eventName = fromEvent(this.#element, 'eventName')

        for (const member of publicProperties) {
          if (
            classDeclaration.body.body.every((n) => {
              return (
                n.type !== 'MethodDefinition' ||
                n.kind !== 'set' ||
                context.sourceCode.getText(n.key) !== member.name.getText() ||
                !context.sourceCode.getText(n).includes('@Input(')
              );
            })
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingInput',
              data: { symbol: member.name.getText() },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                let input = '@Input(';
                const decorator = ts
                  .getDecorators(member)
                  ?.find((e) => e.getText().includes('attribute'));
                if (decorator) {
                  input += `{ alias: ${decorator.getText().match(/['"]([^'"]*)['"]/g)![0]} }`;
                }
                if (member.type) {
                  // FIXME add import from esta core/attribute-transform
                  if (member.type.getText() === 'boolean') {
                    if (input.includes('alias')) {
                      input.replace(`}`, `, transform: booleanAttribute }`);
                    } else {
                      input += `{ transform: booleanAttribute }`;
                    }
                  } else if (member.type.getText() === 'number') {
                    if (input.includes('alias')) {
                      input.replace(`}`, `, transform: numberAttribute }`);
                    } else {
                      input += `{ transform: numberAttribute }`;
                    }
                    expectedAngularImports.add('numberAttribute');
                  }
                }
                input += `)`;

                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  ${input}
  public set ${member.name.getText()}(value: ${member.type?.getText() ?? 'any'}) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.${member.name.getText()} = value));
  }
  public get ${member.name.getText()}(): ${member.type?.getText() ?? 'any'} {
    return this.#element.nativeElement.${member.name.getText()};
  }\n`,
                );
              },
            });
          }
        }

        for (const member of publicSetterGetter) {
          // TODO: Add getter or setter
        }

        for (const member of publicMethods) {
          // TODO: Add method call
        }

        const program = context.sourceCode.ast;

        // Add necessary Angular imports
        const angularCoreImport = program.body.find(
          (n): n is TSESTree.ImportDeclaration =>
            n.type === 'ImportDeclaration' && n.source.value === '@angular/core',
        );
        if (!angularCoreImport) {
          const imports = Array.from(expectedAngularImports).sort().join(', ');
          context.report({
            node: program,
            messageId: 'angularMissingImport',
            data: { symbol: imports },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `import { ${imports} } from '@angular/core';\n`),
          });
        } else {
          const existingImports = angularCoreImport.specifiers.map(
            (s) => ((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name,
          );
          const importsToAdd = Array.from(expectedAngularImports).filter(
            (i) => !existingImports.includes(i),
          );
          if (importsToAdd.length > 0) {
            const imports = importsToAdd.sort().join(', ');
            context.report({
              node: angularCoreImport,
              messageId: 'angularMissingImport',
              data: { symbol: imports },
              fix: (fixer) =>
                fixer.insertTextAfter(angularCoreImport.specifiers.at(-1)!, `, ${imports}`),
            });
          }
        }

        const elementImport = `@sbb-esta/lyne-${relative(srcPath, dirname(originFile))}.js`;

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
                `\nimport type { ${elementClassName} } from '${elementImport}';`,
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
            fix: (fixer) => fixer.insertTextAfter(lastImport, `\nimport '${elementImport}';`),
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
      angularMissingElementRef: 'Missing ElementRef property',
      angularMissingNgZone: 'Missing NgZone property',
      angularMissingInput: 'Missing input for property {{ property }}',
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
