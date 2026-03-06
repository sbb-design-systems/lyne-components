import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

for (const file of globSync(join(projectRoot, 'src/**/*.ts'))) {
  const content = readFileSync(file, 'utf-8');
  const matches = Array.from(content.matchAll(/import\s+'[./\w-]+.ts';/g));
  if (!matches.length && file.endsWith('.spec.ts')) {
    const parts = relative(projectRoot, file).split('/');
    const moduleName = parts[2];
    const newImport = `${'../'.repeat(parts.length - 3)}${moduleName}.ts`;

    const imports = Array.from(content.matchAll(/import /g));
    if (!imports.length) {
      console.log(file);
      continue;
    }
    const lastImportIndex = imports.at(-1)!.index;
    const index = lastImportIndex + content.substring(lastImportIndex).indexOf(';') + 1;

    const newContent = `${content.slice(0, index)}\n\nimport '${newImport}';${content.slice(index)}`;
    writeFileSync(file, newContent, 'utf-8');
  }
}
