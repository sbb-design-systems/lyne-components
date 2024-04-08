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
              node[key] = value.replace(/^\/?src\/components\//, '').replace(/\/[^/.]+.ts$/, '');
            }
          }
        }
        for (const module of customElementsManifest.modules) {
          fixModulePaths(module);
          for (const declaration of module.declarations.filter((d) => d.kind === 'class')) {
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
      },
    },
  ],
};
