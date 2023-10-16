import { defineConfig, Plugin } from 'vite';
import postcssLit from 'rollup-plugin-postcss-lit';
import dts from 'vite-plugin-dts';
import glob from 'glob';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Include all directories containing an index.ts
const modules = glob
  .sync('src/components/*/index.ts', {
    cwd: dirname(fileURLToPath(import.meta.url)),
  })
  .map(dirname);

// https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
function excludeNodeModulesSourceMaps(): Plugin {
  return {
    name: 'sourcemap-exclude',
    transform: (code: string, id: string) =>
      id.includes('node_modules') ? { code, map: { mappings: '' } } : undefined,
  };
}

export default defineConfig(({ command, mode }) => ({
  plugins: [
    excludeNodeModulesSourceMaps(),
    postcssLit({
      exclude: ['**/*global.*', 'src/storybook/**/*'],
    }),
    ...(command === 'build' && mode !== 'development'
      ? modules.map((p) =>
          dts({
            entryRoot: p,
            include: `${p}/**/*.{ts,tsx}`,
            exclude: '**/*.{stories,spec,e2e}.{ts,tsx}',
          }),
        )
      : []),
  ],
  build: {
    lib: {
      entry: modules.reduce(
        (current, next) => Object.assign(current, { [basename(next)]: join(next, 'index.ts') }),
        {} as Record<string, string>,
      ),
      formats: ['es'],
    },
    minify: false,
    rollupOptions: {
      external: [/^lit\/?/],
    },
  },
}));
