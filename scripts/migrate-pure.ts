import { existsSync, globSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const toPascalCase = (name: string): string =>
  name!.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase());

for (const name of ['elements']) {
  const packageRoot = join(projectRoot, `src/${name}/`);
  for (const type of ['*.stories.ts', 'readme.md']) {
    const files = globSync(join(packageRoot, `**/${type}`));
    for (const file of files) {
      const subfiles = globSync(join(dirname(file), `**/${type}`)).filter((f) => f !== file);
      if (subfiles.length > 0) {
        for (const subfile of subfiles) {
          rmSync(subfile);
        }
      }
    }
  }
}
