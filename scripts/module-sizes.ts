import { readdirSync, globSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL(`../dist/elements/`, import.meta.url));

function iterateDirs(root: string): void {
  const dirents = readdirSync(root, { withFileTypes: true });

  for (const dir of dirents.filter(
    (dir) =>
      dir.isDirectory() &&
      (dir.name === 'core' || dirents.some((d) => d.name === `${dir.name}.js`)),
  )) {
    const size = [
      ...globSync(`${root}/${dir.name}/**/*.js`),
      ...globSync(`${root}/${dir.name}*.js`),
    ].reduce((counter, next) => counter + readFileSync(next).length, 0);
    console.log(`${relative(packageRoot, join(root, dir.name))}: ${size} bytes`);
    iterateDirs(join(root, dir.name));
  }
}

iterateDirs(packageRoot);
