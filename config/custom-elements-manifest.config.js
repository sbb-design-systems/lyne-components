import { parse } from 'comment-parser';

/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
export default {
  litelement: true,
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.spec.ts', '**/*.e2e.ts', '**/*.stories.ts'],
  outdir: 'dist/components',
  dependencies: false,
  packagejson: false,
  plugins: [
    {
      analyzePhase({ ts, node, moduleDoc }) {
        if (ts.isPropertyDeclaration(node)) {
          const className = node.parent.name.getText();
          const classDoc = moduleDoc.declarations.find(
            (declaration) => declaration.name === className,
          );

          for (const jsDoc of node.jsDoc ?? []) {
            for (const parsedJsDoc of parse(jsDoc.getFullText())) {
              for (const tag of parsedJsDoc.tags) {
                if (tag.tag === 'ssrchildcounter') {
                  const member = classDoc.members.find((m) => m.name === node.name.getText());
                  member['_ssrchildcounter'] = true;
                }
              }
            }
          }
        } else if (
          ts.isNewExpression(node) &&
          node.expression.getText() === 'NamedSlotStateController'
        ) {
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
        for (const module of customElementsManifest.modules) {
          module.path = module.path.replace(/^src\/components\//, '').replace(/\/[^/.]+.ts$/, '');
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
