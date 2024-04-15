/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
export default {
  litelement: true,
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*[.-]{stories,spec,e2e,test-utils}.ts', '**/private/*', 'vite.config.ts'],
  outdir: 'dist/components',
  dependencies: false,
  packagejson: false,
  plugins: [
    {
      analyzePhase({ ts, node, moduleDoc }) {
        if (ts.isNewExpression(node) && node.expression.getText() === 'NamedSlotStateController') {
          let classNode = node;
          while (classNode) {
            if (ts.isClassDeclaration(classNode)) {
              const className = classNode.name.getText();
              const classDoc = moduleDoc.declarations.find(
                (declaration) => declaration.name === className,
              );
              classDoc['_ssrslotstate'] = true;
            }
            classNode = classNode.parent;
          }
        }
      },
      packageLinkPhase({ customElementsManifest }) {
        function fixModulePaths(node) {
          for (const [key, value] of Object.entries(node)) {
            if (Array.isArray(value)) {
              value.forEach(fixModulePaths);
            } else if (typeof value === 'object') {
              fixModulePaths(value);
            } else if (key === 'module' || key === 'path') {
              node[key] = value.replace(/^\/?src\/components\//, '').replace(/.ts$/, '.js');
            }
          }
        }
        for (const module of customElementsManifest.modules) {
          fixModulePaths(module);
          for (const declaration of module.declarations.filter((d) => d.kind === 'class')) {
            if (declaration.name === 'SbbIconBase') {
              delete declaration.customElement;
            }
            for (const member of declaration.members) {
              if (member.name.startsWith('_') && member.default) {
                const publicName = member.name.replace(/^_/, '');
                const publicMember = declaration.members.find((m) => m.name === publicName);
                if (publicMember) {
                  publicMember.default = member.default;
                }
              }
            }
          }
        }
        const isInlinedEntryPoint = (entry) => {
          const parts = entry.declaration.package?.split(/[./]+/) ?? [];
          return (
            entry.name === '*' &&
            entry.declaration.name === '*' &&
            parts.length === 4 &&
            parts[0] === '' &&
            parts[1] === parts[2] &&
            parts[3] === 'js'
          );
        };
        for (const moduleEntry of customElementsManifest.modules) {
          if (
            !moduleEntry.declarations.length &&
            moduleEntry.exports.length === 1 &&
            isInlinedEntryPoint(moduleEntry.exports[0])
          ) {
            const entry = moduleEntry.exports.pop();
            const path = `${moduleEntry.path.replace(/\/[\w-]+.js/, '/').replace(/[\w-]+.js$/, '')}${entry.declaration.package.substring(2)}`;
            const compiledModule = customElementsManifest.modules.find((m) => m.path === path);
            moduleEntry.declarations.push(...compiledModule.declarations);
            for (const entry of compiledModule.exports) {
              entry.declaration.module = entry.declaration.module.replace(/\/[\w-]+.js/, '.js');
            }
            moduleEntry.exports.push(...compiledModule.exports);
            customElementsManifest.modules = customElementsManifest.modules.filter(
              (m) => m !== compiledModule,
            );
          }
        }
      },
    },
  ],
};
