import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { globSync } from 'node:fs';
import { basename, dirname } from 'path';

const indexFiles = globSync('**/index.ts', {
  cwd: dirname(import.meta.resolve('../src/elements')),
});
for (const indexFile of indexFiles) {
  const content = readFileSync(indexFile, 'utf8').replaceAll(
    /from '.([^']+)/g,
    (_, m) => `from './${basename(dirname(indexFile))}${m.replace(/\/index.js$/, '.js')}`,
  );
  unlinkSync(indexFile);
  writeFileSync(indexFile.replace(/\/index.ts$/, '.ts'), content, 'utf8');
}
