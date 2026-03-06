import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
for (const file of globSync(join(projectRoot, 'src/**/*.ts'))) {
  const content = readFileSync(file, 'utf-8');
  const matches = Array.from(content.matchAll(/import\s+'[./\w-].component.ts';/g));
  console.log(file + ': ' + matches.map((m) => m[0]).join(', '));

  if (file.endsWith('.ssr.spec.ts')) {
    console.log(file);
  }
}
