/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
export default {
  litelement: true,
  globs: ['src/**/*.(ts|tsx)'],
  exclude: ['**/*.spec.ts', '**/*.e2e.ts', '**/*.stories.tsx', '**/index.ts'],
  outdir: 'dist',
  dependencies: false,
};
