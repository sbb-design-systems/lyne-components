import { readdirSync, renameSync } from 'fs';

const componentsDir = new URL('../src/components/', import.meta.url);
readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('sbb-'))
  .forEach((d) => {
    const dir = new URL(`./${d.name}/`, componentsDir);
    console.log(dir.pathname);
    readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name.startsWith('sbb-'))
      .forEach((f) => {
        renameSync(new URL(`./${f.name}`, dir), new URL(`./${f.name.replace(/^sbb-/, '')}`, dir));
      });
    renameSync(dir, new URL(`./${d.name.replace(/^sbb-/, '')}`, componentsDir));
  });
