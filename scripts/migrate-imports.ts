import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

for (const file of globSync(join(projectRoot, 'src/**/*.ssr.spec.ts'))) {
  const content = readFileSync(file, 'utf-8');
  const matches = Array.from(content.matchAll(/import\s+('[./\w-]+.ts');/g));
  if (matches.length) {
    writeFileSync(
      file,
      content.replaceAll(
        /modules: \[[^\]]+\]/g,
        `modules: [${matches.map((m) => m[1]).join(', ')}]`,
      ),
      'utf-8',
    );
  }
}
