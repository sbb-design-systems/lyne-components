import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
for (const file of globSync(join(projectRoot, 'src/**/*.ts'))) {
  const content = readFileSync(file, 'utf-8');
  const matches = Array.from(content.matchAll(/import\s+'[./\w-]+.component.ts';/g));
  if (matches.length > 0) {
    if (file.endsWith('.component.ts')) {
      throw new Error(file);
    }
    console.log(file + ' ' + matches.map((m) => m[0]).join(', '));

    let newContent = content;
    if (matches.length === 1 && matches[0][0].match(/.\/[\w-]+.component.ts/)) {
      const parts = relative(projectRoot, file).split('/');
      const moduleName = parts[2];
      const newImport = `${'../'.repeat(parts.length - 3)}${moduleName}.ts`;
      newContent = content.replace(matches[0][0], `import '${newImport}';`);
    } else {
      console.log(file + ' ' + matches.map((m) => m[0]).join(', '));
    }

    if (content !== newContent) {
      writeFileSync(file, newContent, 'utf-8');
    }
  }
}
