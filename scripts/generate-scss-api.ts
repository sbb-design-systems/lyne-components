import { globSync, writeFileSync, existsSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

import { format, resolveConfig } from 'prettier';

async function generateScssApi(packageDir: string): Promise<void> {
  const indexPath = join(packageDir, '_index.scss');

  const files = globSync('**/_*.global.scss', {
    cwd: packageDir,
    exclude: (p) => p.startsWith('core/styles/'),
  })
    .sort()
    .map((f) => join(packageDir, f));

  const forwards = new Set<string>();

  if (existsSync(join(packageDir, 'core/styles/_index.scss'))) {
    forwards.add("@forward './core/styles';");
  }

  for (const file of files) {
    const rel = relative(packageDir, file);
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

  // We apply prettier to avoid formatting conflicts
  const options = await resolveConfig(indexPath);
  writeFileSync(
    indexPath,
    await format(forwardsArray.join('\n') + '\n', { ...options, filepath: indexPath }),
    'utf8',
  );

  console.log(`Written ${forwardsArray.length} entries to ${indexPath}`);
}

await generateScssApi(join(import.meta.dirname, '..', 'src', 'elements'));
await generateScssApi(join(import.meta.dirname, '..', 'src', 'elements-experimental'));
