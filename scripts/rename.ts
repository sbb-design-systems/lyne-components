import { existsSync, globSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const exclusions = ['.spec.ts', '.stories.ts', '.component.ts'];
for (const dir of ['elements', 'elements-experimental'].map((d) =>
  fileURLToPath(import.meta.resolve(`../src/${d}`)),
)) {
  const files = globSync(`**/*.ts`, {
    cwd: dir,
    exclude: (n) => exclusions.some((e) => n.endsWith(e)),
  })
    .map((f) => join(dir, f))
    .filter((f) => basename(f).split('.')[0] === basename(dirname(f)))
    .filter((f) => readFileSync(f, 'utf8').includes('@customElement'));
  for (const file of files) {
    renameSync(file, `${file.replace(/\.ts$/, '.component.ts')}`);
    const match = `/${basename(file).replace(/\.ts$/, '.js')}`;
    for (const associatedFile of globSync('*.ts', { cwd: dirname(file) }).map((f) =>
      join(dirname(file), f),
    )) {
      let content = readFileSync(associatedFile, 'utf8');
      if (content.includes(match)) {
        content = content.replaceAll(match, match.replace(/\.js$/, '.component.js'));
        writeFileSync(associatedFile, content, 'utf8');
      }
    }
    const barrelFile = `${dirname(file)}.ts`;
    if (existsSync(barrelFile)) {
      let content = readFileSync(barrelFile, 'utf8');
      if (content.includes(match)) {
        content = content.replaceAll(match, match.replace(/\.js$/, '.component.js'));
        writeFileSync(barrelFile, content, 'utf8');
      }
    }
  }
}
