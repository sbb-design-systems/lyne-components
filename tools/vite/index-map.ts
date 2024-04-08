import * as glob from 'glob';

export function globIndexMap(cwd: URL): Record<string, string> {
  return glob
    .sync('**/index.ts', { cwd })
    .filter((p) => !p.endsWith('/private/index.ts'))
    .reduce(
      (current, next) =>
        Object.assign(current, {
          [next.replace(/\.ts$/, '')]: next,
        }),
      {} as Record<string, string>,
    );
}
