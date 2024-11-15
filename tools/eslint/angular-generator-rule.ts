/* eslint-disable import-x/no-named-as-default-member */
/* eslint-disable @typescript-eslint/naming-convention */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import type {
  ClassMethod,
  CustomElementDeclaration,
  CustomElementField,
  Event,
  Package
} from 'custom-elements-manifest';
// eslint-disable-next-line import-x/default
import ts from 'typescript';

import elementsManifestConfig from '../manifest/elements-custom-elements-manifest.config.js';

const manifest: Package = JSON.parse(readFileSync(`${elementsManifestConfig.outdir}/custom-elements.json`, 'utf-8'));

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
        const expectedRxJsImports = new Set<string>();
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
                  `  #element = inject(ElementRef<${elementClassName}>);\n`
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
                  `  #ngZone = inject(NgZone);`);
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

        const moduleFromManifest = manifest.modules.find(e => e.declarations && e.declarations.find(e => e.name === elementClassName));
        if (moduleFromManifest) {
          const moduleDecl = moduleFromManifest.declarations?.find(e => e.kind === 'class') as CustomElementDeclaration;
          const publicProps = moduleDecl?.members?.filter(e =>
            e.privacy === 'public' && e.kind === 'field' && !!(e as CustomElementField).attribute
          ) as CustomElementField[];
          const publicGetter = moduleDecl?.members?.filter(e =>
            e.privacy === 'public' && e.kind === 'field' && !e.static && !(e as CustomElementField).attribute
          ) as CustomElementField[];
          const publicEvents: Event[] | undefined = moduleDecl.events;
          const publicMethods = moduleDecl.members?.filter(e => e.kind === 'method' && e.privacy === 'public')  as ClassMethod[];

          if (publicProps) {
            for (const member of publicProps) {
              if (
                classDeclaration.body.body.every(
                  (n) => {
                    return n.type !== 'MethodDefinition'
                      || n.kind !== 'set'
                      || context.sourceCode.getText(n.key) !== member.name
                      || !context.sourceCode.getText(n).includes('@Input(');
                  }
                )
              ) {
                context.report({
                  node: classDeclaration.body,
                  messageId: 'angularMissingInput',
                  data: { property: member.name },
                  fix: (fixer) => {
                    const endOfBody = classDeclaration.body.range[1] - 1;
                    // FIXME input converter

                    let docsAndDecorator = `@Input({ alias: '${member.attribute}' })`;
                    if (member.description) {
                      docsAndDecorator = `
  /**
   * ${member.description.replaceAll('\n', '\n   * ')}
   */
  @Input({ alias: '${member.attribute}'})`;
                    }

                    return fixer.insertTextBeforeRange(
                      [endOfBody, endOfBody],
                      `
  ${docsAndDecorator}
  public set ${member.name}(value: ${member.type?.text ?? 'any'}) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.${member.name} = value));
  }
  public get ${member.name}(): ${member.type?.text ?? 'any'} {
    return this.#element.nativeElement.${member.name};
  }`);
                  }
                });
              }
            }
          }

          if (publicGetter) {
            for (const member of publicGetter) {
              if (
                classDeclaration.body.body.every(
                  (n) => {
                    return n.type !== 'MethodDefinition'
                      || n.kind !== 'get'
                      || context.sourceCode.getText(n.key) !== member.name;
                  }
                )
              ) {
                context.report({
                  node: classDeclaration.body,
                  messageId: 'angularMissingInput',
                  data: { property: member.name },
                  fix: (fixer) => {
                    const endOfBody = classDeclaration.body.range[1] - 1;

                    let docs;
                    if (member.description) {
                      docs = `
  /**
   * ${member.description.replaceAll('\n', '\n   * ')}
   */`;
                    }
                    return fixer.insertTextBeforeRange(
                      [endOfBody, endOfBody],
                      `${docs ? `\n${docs}` : null}
  public get ${member.name}(): ${member.type?.text ?? 'any'} {
    return this.#element.nativeElement.${member.name};
  }
`
                    );
                  }
                });
              }
            }
          }

          if (publicEvents) {
            expectedAngularImports.add('Output');
            expectedRxJsImports.add('fromEvent').add('type Observable');
            for (const publicEvent of publicEvents) {
              if (
                classDeclaration.body.body.every(
                  (n) => {
                    return n.type !== 'PropertyDefinition'
                      || context.sourceCode.getText(n.key) !== publicEvent.name
                      || !context.sourceCode.getText(n).includes('@Output(');
                  }
                )
              ) {
                context.report({
                  node: classDeclaration.body,
                  messageId: 'angularMissingOutput',
                  data: { property: publicEvent.name },
                  fix: (fixer) => {
                    const endOfBody = classDeclaration.body.range[1] - 1;

                    let docsAndDecorator = `@Output()`;
                    if (publicEvent.description) {
                      docsAndDecorator = `
  /**
   * ${publicEvent.description.replaceAll('\n', '\n   * ')}
   */
  @Output() public`;
                    }

                    return fixer.insertTextBeforeRange(
                      [endOfBody, endOfBody],
                      `${docsAndDecorator} ${publicEvent.name}: Observable<${publicEvent.type.text}> = fromEvent(this.#element.nativeElement, '${publicEvent.name}');
`);
                  }
                });
              }
            }
          }

          if (publicMethods) {
            for (const publicMethod of publicMethods) {
              if (
                classDeclaration.body.body.every(
                  (n) => {
                    return n.type !== 'MethodDefinition'
                      || context.sourceCode.getText(n.key) !== publicMethod.name
                  }
                )
              ) {
                context.report({
                  node: classDeclaration.body,
                  messageId: 'angularMissingMethod',
                  data: { property: publicMethod.name },
                  fix: (fixer) => {
                    const endOfBody = classDeclaration.body.range[1] - 1;
                    let docsAndDecorator = `public`;
                    if (publicMethod.description) {
                      docsAndDecorator = `
  /**
   * ${publicMethod.description.replaceAll('\n', '\n   * ')}${publicMethod.deprecated ? '\n   * @deprecated': ''}
   */
  public`;
                    }
                    const params = publicMethod.parameters && publicMethod.parameters.length > 0
                      ? `${publicMethod.parameters.map(e => e.name + ': ' + e.type?.text).join(', ')}`
                      : '';
                    const args = publicMethod.parameters && publicMethod.parameters.length > 0
                      ? `${publicMethod.parameters.map(e => e.name).join(', ')}`
                      : '';
                    return fixer.insertTextBeforeRange(
                      [endOfBody, endOfBody],
`${docsAndDecorator} ${publicMethod.name}(${params}): ${publicMethod.return?.type?.text} {
    this.#element.nativeElement.${publicMethod.name}(${args});
  }
`);
                  }
                });
              }
            }
          }
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
          const importsToAdd = Array.from(expectedAngularImports)
            .filter((i) => !existingImports.includes(i));
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

        // FIXME if no output don't add these
        const rxjsCoreImport = program.body.find(
          (n): n is TSESTree.ImportDeclaration =>
            n.type === 'ImportDeclaration' && n.source.value === 'rxjs'
        );
        if (!rxjsCoreImport) {
          const imports = Array.from(expectedRxJsImports).sort().join(', ');
          context.report({
            node: program,
            messageId: 'rxjsMissingImport',
            data: { symbol: imports },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `import { ${imports} } from 'rxjs';\n`)
          });
        } else {
          const existingImports = rxjsCoreImport.specifiers.map(
            (s) => (s as TSESTree.ImportSpecifier).importKind === 'type'
              ? `${(s as TSESTree.ImportSpecifier).importKind} ${((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name}`
              : ((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name
          );
          const importsToAdd = Array.from(expectedRxJsImports)
            .filter((i) => !existingImports.includes(i));
          if (importsToAdd.length > 0) {
            const imports = importsToAdd.sort().join(', ');
            context.report({
              node: rxjsCoreImport,
              messageId: 'angularMissingImport',
              data: { symbol: imports },
              fix: (fixer) =>
                fixer.insertTextAfter(rxjsCoreImport.specifiers.at(-1)!, `, ${imports}`)
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
              n.source.value !== elementImport
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
      rxjsMissingImport: 'Missing import {{ symbol }}',
      angularMissingDirective: 'Missing class for {{ className }}',
      angularMissingElementRef: 'Missing ElementRef property',
      angularMissingNgZone: 'Missing NgZone property',
      angularMissingInput: 'Missing input for property {{ property }}',
      angularMissingOutput: 'Missing output {{ property }}',
      angularMissingMethod: 'Missing method {{ property }}',
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});
