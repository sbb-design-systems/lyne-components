import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

for (const name of ['elements', 'elements-experimental']) {
  const packageRoot = join(projectRoot, `src/${name}/`);
  const rootEntrypoints = readdirSync(packageRoot, {
    withFileTypes: true,
  })
    .filter((d) => d.isFile() && d.name.endsWith('.ts'))
    .map((d) => join(d.parentPath, d.name));
  for (const entrypoint of rootEntrypoints) {
    const directoryName = basename(entrypoint, '.ts');
    if (directoryName === 'button' || directoryName === 'link') {
      continue;
    }
    const directoryPath = join(dirname(entrypoint), directoryName);
    const names = readdirSync(directoryPath, { withFileTypes: true, recursive: true })
      .filter((d) => d.isFile() && d.name.endsWith('.ts') && !d.name.match(/\.(stories|spec)\.ts$/))
      .map((d) => {
        const result = readFileSync(join(d.parentPath, d.name), 'utf-8').split(
          'public static override readonly elementName: string = ',
        );
        if (result.length === 2) {
          return { path: join(d.parentPath, d.name), name: result[1].split("'")[1] };
        }

        return null!;
      })
      .filter(Boolean);

    const templatePure = `/** @entrypoint */
${names.map(({ path }) => `export * from './${relative(projectRoot, path)}';`).join('\n')}
`;
    writeFileSync(join(packageRoot, `${directoryName}.pure.ts`), templatePure, 'utf8');

    const template = `/** @entrypoint */
export * from './${directoryName}.pure.ts';
`;
    writeFileSync(entrypoint, template, 'utf8');

    console.log(directoryName, names);
  }
}
