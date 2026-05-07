import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Config, Plugin } from '@custom-elements-manifest/analyzer';
import type {
  JSDoc,
  LiteralTypeNode,
  Type as TsType,
  TypeChecker,
  TypeFlags,
  TypeReferenceNode,
} from '@custom-elements-manifest/analyzer/node_modules/typescript';
import { FEATURES } from '@custom-elements-manifest/analyzer/src/features/index.js';
import { resolveModuleOrPackageSpecifier } from '@custom-elements-manifest/analyzer/src/utils/index.js';
import {
  getAllDeclarationsOfKind,
  getInheritanceTree,
  getModuleForClassLike,
  getModuleFromManifests,
} from '@custom-elements-manifest/analyzer/src/utils/manifest-helpers.js';
import type {
  ClassDeclaration,
  ClassField,
  CustomElement,
  Declaration,
  MixinDeclaration,
  Package,
  Privacy,
  Reference,
  Type,
} from 'custom-elements-manifest';

const overrideTypeKey = 'overrideType' as const;
const classGenericsTypeKey = 'classGenerics' as const;
const resolvedTypeKey = 'resolved' as const;
const memberDenyList = ['define', 'addController', 'removeController'];

type UnwrapArray<A> = A extends unknown[] ? UnwrapArray<A[number]> : A;

interface OverrideTypeInfo {
  memberName: string;
  memberOverrideType: string;
}

interface TSTypeInternal extends TsType {
  types?: TSTypeInternal[];
  value?: string | number;
}

/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createManifestConfig(library = '') {
  let typeChecker: TypeChecker;
  // Map of type alias name -> resolved string-literal union text, e.g. "SbbCheckboxSize" -> "'xs' | 's' | 'm'"
  const resolvedTypeAliasMap = new Map<string, string>();
  // Map of "ClassName.memberName" -> resolved type text
  const resolvedTypeMap = new Map<string, string>();

  /**
   * Recursively expands a TypeScript type to its primitive literal representation.
   * Returns null if the type contains anything other than string literals, null or undefined.
   */
  function expandType(type: TSTypeInternal, flags: typeof TypeFlags): string | null {
    if (type.flags & flags.Union) {
      const parts = (type.types ?? []).map((e) => expandType(e, flags));
      return parts.some((p) => p === null) ? null : parts.join(' | ');
    } else if (type.flags & flags.StringLiteral) {
      return `'${(type.value as string).replace(/'/g, "\\'")}'`;
    } else if (type.flags & flags.Null) {
      return 'null';
    } else if (type.flags & flags.Undefined) {
      return 'undefined';
    }
    // Number literals, booleans, classes, interfaces etc. – not string-literal-only
    return null;
  }

  return {
    litelement: true,
    globs: [`src/${library}/**/*.ts`],
    exclude: ['**/(*.)?{stories,spec,private}.ts', '**/private/*', 'vite.config.ts'],
    outdir: `dist/${library}`,
    dependencies: false,
    packagejson: false,
    overrideModuleCreation({ ts, globs }) {
      const projectRoot = fileURLToPath(new URL('../', import.meta.url));
      const result = ts.readConfigFile(join(projectRoot, 'tsconfig.json'), ts.sys.readFile);
      if (result.error) {
        throw new Error(`Error reading tsconfig.json: ${result.error.messageText}`);
      }

      // Due to Typescript version mismatch, we have to exclude some newer options
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { erasableSyntaxOnly, rewriteRelativeImportExtensions, ...cleanedOptions } =
        result.config.compilerOptions;

      const options = ts.convertCompilerOptionsFromJson(cleanedOptions, projectRoot);
      if (options.errors.length) {
        throw new Error(
          `Error parsing tsconfig.json: ${options.errors.map((e) => e.messageText).join(', ')}`,
        );
      }

      const absoluteGlobs = globs.map((g) => path.resolve(process.cwd(), g));
      // Also include elements source files for cross-package type alias resolution.
      // (e.g. elements-experimental imports SbbHeadingLevel from @sbb-esta/lyne-elements which
      // maps to src/elements/* via tsconfig paths, but CEM's ts may not follow path mappings)
      const extraFiles = ts.sys.readDirectory(
        path.resolve(process.cwd(), 'src/elements'),
        ['.ts'],
        ['**/*.{private}.ts', '**/private'],
        ['**/*.ts'],
      );
      const allGlobs = [...new Set([...absoluteGlobs, ...extraFiles])];
      const program = ts.createProgram(allGlobs, options.options);
      typeChecker = program.getTypeChecker();

      // Pre-populate the alias map by scanning all source files for type aliases,
      // and the resolvedTypeMap for class members referencing named types.
      for (const sf of program.getSourceFiles()) {
        if (sf.isDeclarationFile) {
          continue;
        }
        ts.forEachChild(sf, (node) => {
          if (ts.isTypeAliasDeclaration(node)) {
            const name = node.name.getText();
            const tsType = typeChecker!.getTypeAtLocation(node.type);
            const resolvedText = expandType(tsType, ts.TypeFlags);
            if (resolvedText !== null && resolvedText !== name) {
              resolvedTypeAliasMap.set(name, resolvedText);
            }
          } else if (ts.isClassDeclaration(node)) {
            const className = node.name?.getText();
            if (!className) {
              return;
            }
            for (const member of node.members) {
              if (
                (ts.isPropertyDeclaration(member) ||
                  ts.isGetAccessorDeclaration(member) ||
                  ts.isAutoAccessorPropertyDeclaration?.(member)) &&
                member.type
              ) {
                const memberName = member.name.getText();
                const rawText = member.type.getText();
                // Only resolve if the type references a named type (not already pure literals)
                if (!/\b[A-Z]\w*/.test(rawText)) {
                  continue;
                }
                const tsType = typeChecker!.getTypeAtLocation(member.type);
                let resolvedText = expandType(tsType, ts.TypeFlags);
                if (resolvedText !== null) {
                  // TypeScript may drop null/undefined when expanding aliases.
                  // Re-append them from the raw type text if missing.
                  if (/\bnull\b/.test(rawText) && !/\bnull\b/.test(resolvedText)) {
                    resolvedText += ' | null';
                  }
                  if (/\bundefined\b/.test(rawText) && !/\bundefined\b/.test(resolvedText)) {
                    resolvedText += ' | undefined';
                  }
                  if (resolvedText !== rawText) {
                    resolvedTypeMap.set(`${className}.${memberName}`, resolvedText);
                    // Also register the raw type text in the alias map so that inherited members
                    // (which share the same type text but a different class name) can be resolved
                    // via the fallback substitution path in packageLinkPhase.
                    resolvedTypeAliasMap.set(rawText, resolvedText);
                  }
                }
              }
            }
          }
        });
      }

      // Keep a map -> original SourceFile for typeChecker lookups in analyzePhase
      const sourceFileByRelativePath = new Map(
        program
          .getSourceFiles()
          .filter((sf) => absoluteGlobs.find((glob) => sf.fileName === glob))
          .map((sf) => {
            const relativePath = globs.find((g) => path.resolve(process.cwd(), g) === sf.fileName)!;
            return [relativePath, sf];
          }),
      );

      return [...sourceFileByRelativePath.keys()].map((relativePath) =>
        // Re-create the SourceFile with the relative path so the manifest stays path-agnostic,
        // but supply the original text so the analyzer can still parse it.
        ts.createSourceFile(
          relativePath,
          sourceFileByRelativePath.get(relativePath)!.getFullText(),
          sourceFileByRelativePath.get(relativePath)!.languageVersion,
          true,
        ),
      );
    },
    plugins: [
      {
        name: 'lyne',
        initialize() {
          // Patch upstream implementation for types
          const inheritancePlugin = FEATURES.find((p) => p.name === 'CORE - APPLY-INHERITANCE');
          if (!inheritancePlugin) {
            throw new Error('Inheritance plugin not found');
          }
          inheritancePlugin.packageLinkPhase = ({ customElementsManifest, context }) => {
            const allManifests: Package[] = [
              customElementsManifest,
              ...((context.thirdPartyCEMs as Package[]) || []),
            ];
            const classLikes: (ClassDeclaration | MixinDeclaration)[] = [];

            allManifests.forEach((manifest) => {
              const classes = getAllDeclarationsOfKind<ClassDeclaration>(manifest, 'class');
              const mixins = getAllDeclarationsOfKind<MixinDeclaration>(manifest, 'mixin');
              classLikes.push(...[...classes, ...mixins]);
            });

            classLikes.forEach((maybeCustomElement) => {
              const customElement = maybeCustomElement as unknown as CustomElement;
              const inheritanceChain = getInheritanceTree(allManifests, customElement.name);

              inheritanceChain?.forEach((klass) => {
                // Ignore the current class itself
                if (klass?.name === customElement.name) {
                  return;
                }

                const membersToProcess = [
                  'slots',
                  'cssParts',
                  'cssProperties',
                  'attributes',
                  'members',
                  'events',
                  'cssStates',
                ] as const;

                membersToProcess.forEach((type) => {
                  type Item = UnwrapArray<CustomElement[typeof type]> & {
                    inheritedFrom?: Reference;
                    type?: Type;
                    privacy?: Privacy;
                  };

                  (klass as unknown as { [type]: Item[] | undefined })?.[type]?.forEach(
                    (currItem) => {
                      const containingModulePath = getModuleForClassLike(allManifests, klass.name);
                      const containingModule = getModuleFromManifests(
                        allManifests,
                        containingModulePath,
                      );

                      const newItem: Item = { ...currItem };

                      /**
                       * If an attr or member is already present in the base class, but we encounter it here,
                       * it means that the base has overridden that method from the super class
                       * So we either add the data to the overridden method, or we add it to the array as a new item
                       */
                      const existing: Item | undefined = customElement?.[type]?.find(
                        (item) => newItem.name === item.name,
                      );

                      if (existing) {
                        existing.inheritedFrom = {
                          name: klass.name,
                          ...resolveModuleOrPackageSpecifier(containingModule, context, klass.name),
                        };

                        (customElement as unknown as { [type]: Item[] | undefined })[type] =
                          customElement?.[type]?.map((item) =>
                            item.name === existing.name
                              ? ({
                                  ...newItem,
                                  ...existing,
                                  ...{
                                    ...(newItem.type && !existing.type
                                      ? { type: newItem.type }
                                      : {}),
                                    ...(newItem.privacy ? { privacy: newItem.privacy } : {}),
                                  },
                                } satisfies Item)
                              : item,
                          );
                      } else {
                        newItem.inheritedFrom = {
                          name: klass.name,
                          ...resolveModuleOrPackageSpecifier(containingModule, context, klass.name),
                        };

                        (customElement as unknown as { [type]: Item[] | undefined })[type] = [
                          ...(customElement[type] || []),
                          newItem,
                        ];
                      }
                    },
                  );
                });
              });
            });
          };
        },
        analyzePhase({ ts, node, moduleDoc }) {
          if (ts.isClassDeclaration(node)) {
            const className = node.name?.getText();
            const classDoc = (moduleDoc.declarations as undefined | CustomElement[])?.find(
              (declaration) => declaration.name === className,
            );
            const elementNameProperty = node.members
              .filter(ts.isPropertyDeclaration)
              .find(
                (m) =>
                  m.name.getText() === 'elementName' &&
                  m.modifiers?.some((o) => o.kind === ts.SyntaxKind.StaticKeyword),
              );
            if (
              classDoc &&
              elementNameProperty?.initializer &&
              ts.isStringLiteral(elementNameProperty.initializer)
            ) {
              // eslint-disable-next-line lyne/local-name-rule
              classDoc.tagName = elementNameProperty.initializer.text;
              classDoc.customElement = true;
            }
          }

          /* Replace the typeName with the provided typeValue, matching only the word,
           * in a way that 'V | null' could be replaced with 'string | null', but 'ValidityState' is not changed.
           */
          function replace(
            typeObj: Type | undefined,
            typeName: string,
            typeValue: string | undefined,
          ): void {
            if (typeObj && typeObj.text) {
              typeObj.text = typeObj.text.replace(
                new RegExp(`\\b${typeName}\\b`, 'g'),
                typeValue ?? '',
              );
            }
          }

          /**
           * Replaces the mixins generics types with the default value.
           *
           * It has been created mainly referencing the `SbbFormAssociatedMixin`,
           * in which it is necessary to replace the generic V type with its default (string).
           * This allows using the jsDoc `@overrideType` annotation only for cases where the default is actually overridden.
           */
          if (ts.isVariableStatement(node)) {
            node.declarationList?.declarations?.forEach((decl) => {
              if (
                decl.initializer &&
                ts.isArrowFunction(decl.initializer) &&
                decl.initializer.typeParameters
              ) {
                const moduleDeclaration: MixinDeclaration = moduleDoc.declarations?.find(
                  (e: Declaration) => e.name === decl.name?.getText(),
                );
                decl.initializer.typeParameters.forEach((typeParam) => {
                  if (typeParam.default) {
                    const typeName = typeParam.name.getText();
                    let typeValue;
                    switch (typeParam.default.kind) {
                      case ts.SyntaxKind.StringKeyword:
                      case ts.SyntaxKind.NumberKeyword: {
                        typeValue = ts.tokenToString(typeParam.default.kind);
                        break;
                      }
                      case ts.SyntaxKind.TypeReference: {
                        typeValue = (
                          typeParam.default as unknown as TypeReferenceNode
                        ).typeName.getText();
                        break;
                      }
                      case ts.SyntaxKind.LiteralType: {
                        switch ((typeParam.default as unknown as LiteralTypeNode).literal.kind) {
                          case ts.SyntaxKind.TrueKeyword:
                          case ts.SyntaxKind.FalseKeyword:
                          case ts.SyntaxKind.NullKeyword: {
                            typeValue = (
                              typeParam.default as unknown as LiteralTypeNode
                            ).literal.getText();
                            break;
                          }
                          default: {
                            typeValue = `'${(typeParam.default as unknown as LiteralTypeNode).literal.getText()}'`;
                            break;
                          }
                        }
                        break;
                      }
                      default: {
                        // Missing cases: intersection types, union types,..?
                        typeValue = typeParam.default.getText();
                        break;
                      }
                    }
                    moduleDeclaration?.members?.forEach((member) => {
                      if (member.kind === 'field') {
                        replace(member.type, typeName, typeValue);
                      }
                      if (member.kind === 'method') {
                        if (member.return) {
                          replace(member.return.type, typeName, typeValue);
                        }
                        if (member.parameters) {
                          member.parameters.forEach((parameter) => {
                            replace(parameter.type, typeName, typeValue);
                          });
                        }
                      }
                    });
                  }
                });
              }
            });
          } else if (ts.isClassDeclaration(node)) {
            const classDeclaration: ClassDeclaration & {
              [classGenericsTypeKey]: string;
              [overrideTypeKey]: OverrideTypeInfo[];
            } = moduleDoc.declarations?.find(
              (declaration: Declaration) => declaration.name === node.name?.getText(),
            );

            if (!classDeclaration) {
              throw new Error('Class declaration not found in moduleDoc');
            }

            /**
             * If the class uses a generic type parameter, add it to the class declaration.
             * It will be used in the Angular wrapper to correctly generate classes.
             * Mainly used for datepicker and calendar components.
             */
            if (node.typeParameters && node.typeParameters.length > 0) {
              classDeclaration[classGenericsTypeKey] = node.typeParameters[0].getText();
            }

            /**
             * When a generic T type is used in a superclass declaration, it overrides the type defined in derived class
             * during the doc generation (as the `value` property in the `SbbFormAssociatedMixinType`).
             * Using the `@overrideType` annotation in the jsDoc's derived class allows to override the type with the correct one.
             *
             * In this phase, the script looks for all the `@overrideType` annotations,
             * and it saves them in the `classDeclaration` object as a pair <property name> / <correct type>.
             */
            (node as unknown as { jsDoc: JSDoc[] }).jsDoc?.forEach((doc) => {
              doc.tags?.forEach((tag) => {
                // eslint-disable-next-line lyne/local-name-rule
                if (tag.tagName.getText() === overrideTypeKey) {
                  const [memberName, memberOverrideType] = (tag.comment as string).split(' - ');
                  if (!classDeclaration[overrideTypeKey]) {
                    classDeclaration[overrideTypeKey] = [{ memberName, memberOverrideType }];
                  } else {
                    classDeclaration[overrideTypeKey].push({ memberName, memberOverrideType });
                  }
                }
              });
            });
          }
        },
        moduleLinkPhase({ moduleDoc }) {
          const classes = (moduleDoc?.declarations as undefined | Declaration[])?.filter(
            (declaration) => declaration.kind === 'class',
          );

          classes?.forEach((klass) => {
            if (!klass?.members) {
              return;
            }
            klass.members = klass?.members?.filter(
              (member) => !memberDenyList.includes(member.name),
            );
          });
        },
        packageLinkPhase({ customElementsManifest }) {
          function fixModulePaths(node: object, pathAction: (value: string) => string): void {
            for (const [key, value] of Object.entries(node)) {
              if (Array.isArray(value)) {
                value.forEach((v) => fixModulePaths(v, pathAction));
              } else if (value !== null && typeof value === 'object') {
                fixModulePaths(value, pathAction);
              } else if (key === 'module' || key === 'path') {
                (node as Record<string, string>)[key] = pathAction(value);
              }
            }
          }
          const fixTsPathsReg = new RegExp(`^\\/?src\\/${library}\\/`);
          const fixTsPaths = (value: string): string =>
            value.replace(fixTsPathsReg, '').replace(/.ts$/, '.js');
          for (const module of customElementsManifest.modules) {
            fixModulePaths(module, fixTsPaths);
            for (const declaration of (module.declarations?.filter(
              (d: Declaration) => d.kind === 'class',
            ) ?? []) as CustomElement[]) {
              // Abstract base classes or mixins are considered components
              // even if they don't have the `customElement` annotation.
              if (
                declaration.name.includes('Base') ||
                declaration.name.includes('MixinType') ||
                declaration.name === 'SbbElement'
              ) {
                delete (declaration as Partial<CustomElement>).customElement;
              }

              /**
               * Search for all the `classDeclaration` which have the `overrideTypeKey` property,
               * and update the provided property with the provided type.
               */
              const overrideType = (declaration as { [overrideTypeKey]?: OverrideTypeInfo[] })[
                overrideTypeKey
              ];

              if (overrideType) {
                overrideType.forEach((overrideObj) => {
                  const memberToOverride = declaration.members?.find(
                    (member): member is ClassField => member.name === overrideObj.memberName,
                  );
                  if (memberToOverride) {
                    memberToOverride.type = {
                      ...memberToOverride.type,
                      text: overrideObj.memberOverrideType,
                    };
                  }
                });
                delete (declaration as { [overrideTypeKey]?: OverrideTypeInfo[] })[overrideTypeKey];
              }

              for (const member of declaration.members ?? []) {
                if (member.name.startsWith('_') && 'default' in member) {
                  const publicName = member.name.replace(/^_/, '');
                  const publicMember = declaration.members!.find((m) => m.name === publicName);
                  if (publicMember) {
                    (publicMember as ClassField).default = member.default;
                  }
                }

                /**
                 * If an element extends a base class, and the base class implements a mixin and overrides some of its property,
                 * the overriding is not considered during the manifest generation because the inheritance chain
                 * is traversed from the outer to the inner element and not vice versa as expected.
                 *
                 * A practical example is the `form` property (get/set) in the button-base-element, which overrides the `form` getter in the form-associated-mixin;
                 * however, the changes are not reflected in the manifest, which mark the `form` member as `readonly`.
                 * This behavior is problematic when the Angular classes are generated, so a manual override must be done.
                 * The corresponding attribute field is not changed, so it can be used as a 'baseline'.
                 */
                const matchedAttribute = declaration.attributes?.find(
                  (e) =>
                    e.name === member.name &&
                    member.inheritedFrom &&
                    e.inheritedFrom &&
                    e.inheritedFrom?.name !== member.inheritedFrom?.name,
                );
                if (matchedAttribute) {
                  delete (member as ClassField).readonly;
                  member.description = matchedAttribute.description;
                  member.inheritedFrom = matchedAttribute.inheritedFrom;
                }
              }
            }
          }
        },
      },
      // Runs after all other plugins (including CORE - APPLY-INHERITANCE) to set type.resolved
      {
        name: 'lyne-resolved-types',
        packageLinkPhase({ customElementsManifest }) {
          // Build a helper map: ClassName.memberName -> resolved/text for all members in the manifest
          // Used to resolve indexed access types like SbbFoo['bar'] in packageLinkPhase.
          const manifestMemberTypeMap = new Map<string, string>();
          for (const mod of customElementsManifest.modules) {
            for (const decl of (mod.declarations ?? []) as CustomElement[]) {
              for (const m of decl.members ?? []) {
                const memberField = m as ClassField & { type?: Type & { resolved?: string } };
                const typeText = memberField.type?.resolved ?? memberField.type?.text;
                if (typeText) {
                  manifestMemberTypeMap.set(`${decl.name}.${m.name}`, typeText);
                }
              }
            }
          }

          for (const module of customElementsManifest.modules) {
            for (const declaration of (module.declarations?.filter(
              (d: Declaration) => d.kind === 'class',
            ) ?? []) as CustomElement[]) {
              for (const member of [
                ...(declaration.members ?? []),
                ...(declaration.attributes ?? []),
              ]) {
                const memberField = member as ClassField & {
                  type?: Type & { [resolvedTypeKey]?: string };
                };
                if (memberField.type?.[resolvedTypeKey]) {
                  continue;
                }
                const typeText = memberField.type?.text ?? '';
                // Only resolve if the type references a named type (not already pure literals)
                if (!typeText || !/\b[A-Z]\w*/.test(typeText)) {
                  continue;
                }

                // First try the precise per-class map from overrideModuleCreation
                let resolvedText = resolvedTypeMap.get(`${declaration.name}.${member.name}`);

                // Fall back: check if the exact type text was registered in the alias map
                // (covers indexed access types like SbbCheckboxElement['size'] used in inherited members)
                if (!resolvedText) {
                  resolvedText = resolvedTypeAliasMap.get(typeText);
                }

                // Fall back: substitute all type aliases using the alias map.
                // Also handles indexed access types like `SbbFoo['bar']` by replacing each
                // `ClassName['memberName']` segment with the resolved type of that member.
                if (!resolvedText) {
                  let substituted = typeText.replace(
                     
                    /\b(\w+)\['(\w+)'\]/g,
                    (_match, className, memberName) => {
                      return (
                        resolvedTypeMap.get(`${className}.${memberName}`) ??
                        manifestMemberTypeMap.get(`${className}.${memberName}`) ??
                        _match
                      );
                    },
                  );
                  if (substituted === typeText) {
                    // No indexed access substitution happened — try plain word substitution
                    substituted = typeText.replace(
                      /\b\w+/g,
                      (match) => resolvedTypeAliasMap.get(match) ?? match,
                    );
                  }
                  if (substituted !== typeText) {
                    // Re-append null/undefined if TypeScript dropped them during alias expansion
                    if (/\bnull\b/.test(typeText) && !/\bnull\b/.test(substituted)) {
                      substituted += ' | null';
                    }
                    if (/\bundefined\b/.test(typeText) && !/\bundefined\b/.test(substituted)) {
                      substituted += ' | undefined';
                    }
                    resolvedText = substituted;
                  }
                }

                if (resolvedText && memberField.type) {
                  memberField.type[resolvedTypeKey] = resolvedText;
                }
              }
            }
          }
        },
      },
    ],
  } satisfies Omit<Config, 'plugins'> & { plugins: Plugin[] };
}
