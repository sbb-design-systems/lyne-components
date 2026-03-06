import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const toPascalCase = (name: string): string =>
  name!.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, ' ').toUpperCase());

for (const name of ['elements']) {
  const files = globSync(join(projectRoot, 'src', name, `*/*.stories.ts`));
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const machtes = Array.from(content.matchAll(/title: '([^']+)'/g));
    if (machtes.length === 1) {
      writeFileSync(
        file,
        content.replace(
          /title: '([^']+)'/,
          `title: 'elements/${toPascalCase(basename(dirname(file)))}'`,
        ),
        'utf-8',
      );
    }
  }
}
