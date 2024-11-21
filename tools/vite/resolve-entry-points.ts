import * as glob from 'glob';

export function resolveEntryPoints(
  cwd: URL,
  skipDirectories: string[] = [],
): Record<string, string> {
  return glob
    .sync('*/**/', {
      cwd,
      ignore: [...skipDirectories, '**/assets', '**/private', '**/__snapshots__'],
    })
    .reduce(
      (current, next) =>
        Object.assign(current, {
          [next]: `${next}.ts`,
        }),
      {} as Record<string, string>,
    );
}
