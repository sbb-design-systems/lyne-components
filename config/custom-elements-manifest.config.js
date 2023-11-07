/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
export default {
  litelement: true,
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.spec.ts', '**/*.e2e.ts', '**/*.stories.tsx'],
  outdir: 'dist/components',
  dependencies: false,
  packagejson: false,
  plugins: [
    {
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.modules.forEach(
          (m) => (m.path = m.path.replace(/^src\/components\//, '').replace(/\/[^/.]+.ts$/, '')),
        );
      },
    },
  ],
};
