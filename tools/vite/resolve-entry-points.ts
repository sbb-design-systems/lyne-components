import { globSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { globExcludeInternals } from './build-meta.js';

export function resolveEntryPoints(cwd: URL): Record<string, string> {
  const cwdAsString = fileURLToPath(cwd);
  return globSync('**/*.ts', {
    cwd: fileURLToPath(cwd),
    withFileTypes: true,
    exclude: (dirent) =>
      globExcludeInternals(dirent) ||
      relative(cwdAsString, join(dirent.parentPath, dirent.name)).includes('/interfaces/'),
  })
    .map((d) => relative(cwdAsString, join(d.parentPath, d.name)))
    .reduce(
      (current, next) => Object.assign(current, { [next.replace(/\.\w+$/, '')]: next }),
      {} as Record<string, string>,
    );
}
