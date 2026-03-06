import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const toPascalCase = (name: string): string =>
  name!.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, ' ').toUpperCase());

for (const name of ['elements']) {
  for (const file of globSync(join(projectRoot, 'src', name, `*/*/*.ts`))) {
    let content = readFileSync(file, 'utf-8');
    const matches = Array.from(
      content.matchAll(/import\s+'(..\/[\w-]+|.\/[\w-]+.component).ts';/g),
    ).sort((a, b) => b.index! - a.index!);
    if (matches.length > 0 && matches.some((m) => m[1].includes('..'))) {
      const first = matches.pop()!;
      for (const match of matches) {
        content = content.replace(match[0], '');
      }
      const parts = content.split(first[0]);
      content = parts[0] + `import '../../${basename(dirname(dirname(file)))}.ts';` + parts[1];
      writeFileSync(file, content, 'utf-8');
    }
  }
}
