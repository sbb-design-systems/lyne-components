import { globSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const toPascalCase = (name: string): string =>
  name!.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase());

for (const name of ['elements', 'elements-experimental']) {
  const packageRoot = join(projectRoot, `src/${name}/`);
  const rootEntrypoints = readdirSync(packageRoot, {
    withFileTypes: true,
  })
    .filter((d) => d.isFile() && d.name.endsWith('.ts') && !d.name.endsWith('.pure.ts'))
    .map((d) => join(d.parentPath, d.name));
  for (const entrypoint of rootEntrypoints) {
    const directoryName = basename(entrypoint, '.ts');
    if (directoryName === 'button' || directoryName === 'link') {
      continue;
    }
    const directoryPath = join(dirname(entrypoint), directoryName);
    const names = readdirSync(directoryPath, { withFileTypes: true, recursive: true })
      .filter(
        (d) =>
          d.isFile() &&
          d.name.endsWith('.ts') &&
          !d.name.match(/\.(stories|spec|private)\.ts$/) &&
          !d.name.endsWith('sample-data.ts'),
      )
      .map((d) => {
        const path = join(d.parentPath, d.name);
        const result = readFileSync(join(d.parentPath, d.name), 'utf-8').split(
          'public static override readonly elementName: string = ',
        );
        if (result.length === 2) {
          return { path, name: result[1].split("'")[1] };
        } else if (!result[0].includes('/** @entrypoint */')) {
          return { path };
        } else {
          return null!;
        }
      })
      .filter(Boolean);

    const templatePure = `/** @entrypoint */
${names
  .map(({ path }) => `export * from './${relative(packageRoot, path)}';`)
  .sort()
  .join('\n')}
`;
    writeFileSync(join(packageRoot, `${directoryName}.pure.ts`), templatePure, 'utf8');

    const classes = names.filter((n) => n.name).map(({ name }) => `${toPascalCase(name!)}Element`);
    const template = `/** @entrypoint */
export * from './${directoryName}.pure.ts';
import { ${classes.join(', ')} } from './${directoryName}.pure.ts';

${classes.map((c) => `${c}.define();`).join('\n')}
`;
    writeFileSync(entrypoint, template, 'utf8');
  }

  const entrypoints = globSync(join(packageRoot, '*/**/*.ts'), { withFileTypes: true })
    .filter(
      (d) =>
        d.isFile() &&
        !d.parentPath.includes('/core') &&
        !d.parentPath.includes('/elements/link') &&
        !d.parentPath.includes('/elements/button') &&
        readFileSync(join(d.parentPath, d.name), 'utf-8').includes('/** @entrypoint */'),
    )
    .map((d) => join(d.parentPath, d.name));
  for (const entrypoint of entrypoints) {
    const entrypointName = basename(entrypoint, '.ts');
    const className = toPascalCase(`sbb-${entrypointName}-element`);
    let content = readFileSync(entrypoint, 'utf-8');
    const define =
      entrypointName === 'common'
        ? ''
        : `
import { ${className} } from '${content.split("'")[1]!.split("'")[0]}';

${className}.define();`;
    content = `${content.trim()}${define}

console.warn(\`The entrypoint '@sbb-esta/${relative(join(projectRoot, 'src'), entrypoint).replace(/\.ts$/, '.js')}' has been deprecated.
Use either '@sbb-esta/${relative(join(projectRoot, 'src'), dirname(entrypoint))}.js' or '@sbb-esta/${relative(join(projectRoot, 'src'), dirname(entrypoint))}.pure.js' instead.\`)
`;
    writeFileSync(entrypoint, content, 'utf-8');
  }
}
