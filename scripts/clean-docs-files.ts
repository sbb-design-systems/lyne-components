import { readdirSync, unlinkSync } from 'node:fs';
import { extname, join } from 'node:path';

const allowedExtensions =
  /^\.(s?css|html?|m?js|json|ts|map|ico|jpe?g|png|svg|woff2|txt|gitignore|gitkeep|stackblitzrc)$/;
// Removes all files not matching allowed extensions from given directory.
readdirSync(new URL('../dist/storybook', import.meta.url), { withFileTypes: true, recursive: true })
  .filter((d) => d.isFile() && !allowedExtensions.test(extname(d.name)))
  .forEach((d) => {
    console.log(`Removing ${join(d.parentPath, d.name)}`);
    unlinkSync(join(d.parentPath, d.name));
  });
