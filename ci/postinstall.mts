import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const root = new URL('..', import.meta.url);

main();

function main() {
  exec('yarn playwright install --with-deps');

  new Map<string, [string, string]>()
    .set('node_modules/@web/test-runner-mocha/dist/autorun.js', [
      'await import(new URL(r,f).href)',
      'await import(new URL(r,f).href)' +
        '.catch(()=>{console.warn(`Failed to load test file ${r}. Retrying...`);return new Promise(r=>setTimeout(r, 100)).then(()=>import(new URL(r,f).href))})'.repeat(10),
    ])
    .forEach(([search, replace], filePath) => searchAndReplace(search, replace, filePath));
}

/**
 * Schedules an edit where the specified file is read and its content replaced based on
 * the given search expression and corresponding replacement. Throws if no changes were made
 * and the patch has not been applied.
 */
function searchAndReplace(search: string, replacement: string, relativeFilePath: string) {
  const filePath = new URL(relativeFilePath, root);
  const originalContent = readFileSync(filePath, 'utf8');
  const newFileContent = originalContent.replace(search, replacement);
  if (originalContent === newFileContent) {
    throw Error(`Could not perform replacement in: ${filePath}.\nSearched for pattern: ${search}`);
  }
  writeFileSync(filePath, newFileContent, 'utf8');
}

/**
 * Executes the given command in the project directory.
 * @param command The command to run
 * @param captureStdout Whether the stdout should be captured and
 *   returned.
 */
function exec(command: string, captureStdout = false) {
  const stdout = execSync(command, {
    cwd: root,
    stdio: ['inherit', captureStdout ? 'pipe' : 'inherit', 'inherit'],
  });
  if (captureStdout) {
    process.stdout.write(stdout);
    return stdout.toString().trim();
  }
}
