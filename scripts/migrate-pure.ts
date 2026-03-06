import { globSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
/*
const toPascalCase = (name: string): string =>
  name!.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase());
*/
for (const name of ['elements']) {
  const files = globSync(join(projectRoot, 'src', name, `*/*.stories.ts`));
  console.log(files);
}
