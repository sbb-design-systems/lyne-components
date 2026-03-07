import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

for (const file of globSync(join(projectRoot, 'src/**/*.spec.ts'))) {
  if (['core', 'button', 'link', 'styles'].some((dir) => file.includes(`/${dir}/`))) {
    continue;
  }

  const content = readFileSync(file, 'utf-8');
  const matches = Array.from(content.matchAll(/import\s+('[./\w-]+.ts');/g));
  const parts = relative(projectRoot, file).split('/');
  const moduleName = parts[2];
  const newImport = `${'../'.repeat(parts.length - 3)}${moduleName}.ts`;
  if (matches.length && matches.every((m) => !m[1].includes(newImport))) {
    const lastImport = matches.at(-1)!;
    writeFileSync(
      file,
      content.replace(lastImport[0], `${lastImport[0]}\nimport '${newImport}';`),
      'utf-8',
    );
  }
}

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
