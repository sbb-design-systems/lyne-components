/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
export default {
  litElement: true,
  globs: ['src/**/sbb-*.(ts|tsx)'],
  exclude: ['src/**/*.spec.ts', 'src/**/*.e2e.ts', 'src/**/*.stories.tsx'],
  outdir: 'dist',
  dependencies: false,
};
