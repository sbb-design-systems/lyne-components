import { ConfigEnv, defineConfig } from 'vite';
import postcssLit from 'rollup-plugin-postcss-lit';
import dts from 'vite-plugin-dts';
import glob from 'glob';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const componentsRoot = fileURLToPath(new URL('./src/components', import.meta.url));
// Include all directories containing an index.ts
const modules = glob
  .sync('src/components/*/**/index.ts', {
    cwd: dirname(fileURLToPath(import.meta.url)),
  })
  .map(dirname);

const isProdBuild = ({ command, mode }: ConfigEnv): boolean =>
  command === 'build' && mode !== 'development';

export default defineConfig((config) => ({
  plugins: [
    postcssLit({
      include: '**/*.scss?lit&inline',
    }),
    ...(isProdBuild(config)
      ? [
          dts({
            entryRoot: 'src/components',
            include: `src/components/**/*.{ts,tsx}`,
            exclude: '**/*.{stories,spec,e2e}.{ts,tsx}',
          }),
        ]
      : []),
  ],
  build: {
    lib: {
      entry: modules.reduce(
        (current, next) =>
          Object.assign(current, {
            [`${relative(componentsRoot, next)}/index`]: join(next, 'index.ts'),
          }),
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
