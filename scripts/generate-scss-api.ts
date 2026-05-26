import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative, basename } from 'path';

const elementsDir = join(import.meta.dirname, '..', 'src', 'elements');
const indexPath = join(elementsDir, '_index.scss');

function findGlobalFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Skip core directory entirely
      if (full === join(elementsDir, 'core/styles')) {
        continue;
      }
      results.push(...findGlobalFiles(full));
    } else if (entry.startsWith('_') && entry.endsWith('.global.scss')) {
      results.push(full);
    }
  }
  return results;
}

const files = findGlobalFiles(elementsDir).sort();

const forwards = new Set<string>(["@forward './core/styles';"]);

for (const file of files) {
  const rel = relative(elementsDir, file);
  // Convert to @forward path: remove leading _, remove .scss extension
  const forwardPath = `./${rel
    .replace(/\/_/g, '/')
    .replace(/^_/, '')
    .replace(/\.scss$/, '')}`;

  // Derive alias from file name
  const moduleName = basename(file).replace(/^_/, '').split('.')[0];
  forwards.add(`@forward '${forwardPath}' as ${moduleName}-*;`);
}

const forwardsArray = [...forwards];

writeFileSync(indexPath, forwardsArray.join('\n') + '\n');
console.log(`Written ${forwardsArray.length} entries to ${indexPath}`);
