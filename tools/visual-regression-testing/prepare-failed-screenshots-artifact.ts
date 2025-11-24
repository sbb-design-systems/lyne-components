import { type CopySyncOptions, cpSync, existsSync, globSync, mkdirSync } from 'node:fs';

// When visual regression tests have failed, we only want to pack the relevant screenshots
// into the artifact transferred to the secure workflow, as uploading and downloading the full
// baseline would take far longer.
// Due to this we copy the necessary screenshots to /dist/screenshots-artifact which will
// be moved to /dist/screenshots in the secure workflow.

const screenshotDir = new URL('../../dist/screenshots/', import.meta.url);
const artifactDir = new URL('../../dist/screenshots-artifact/', import.meta.url);
const copyOptions: CopySyncOptions = { force: true, recursive: true };
mkdirSync(artifactDir, { recursive: true });

cpSync(new URL('./meta.json', screenshotDir), new URL('./meta.json', artifactDir), copyOptions);

const failedDirs = globSync('*/failed/', { cwd: screenshotDir });
for (const failedDir of failedDirs.map((d) => `./${d}`)) {
  cpSync(new URL(failedDir, screenshotDir), new URL(failedDir, artifactDir), copyOptions);
}

const failedFiles = globSync('*/failed/**/*.png', {
  cwd: artifactDir,
  exclude: (name) => name.endsWith('-diff.png'),
}).map((p) => p.replace('/failed/', '/baseline/'));
for (const failedFile of failedFiles.map((f) => `./${f}`)) {
  const baselineFile = new URL(failedFile, screenshotDir);
  if (existsSync(baselineFile)) {
    cpSync(baselineFile, new URL(failedFile, artifactDir), copyOptions);
  }
}
