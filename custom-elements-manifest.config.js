/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer
 */
export default {
  litElement: true,
  globs: ['src/**/sbb-*.ts'],
  exclude: ['src/**/*.spec.ts', 'src/**/*.e2e.ts', 'src/**/*.stories.tsx'],
  outdir: 'dist',
  dependencies: false,
};
