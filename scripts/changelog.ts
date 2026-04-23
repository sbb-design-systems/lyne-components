import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const { positionals } = parseArgs({
  allowPositionals: true,
});
const changelogPath = fileURLToPath(new URL('../CHANGELOG.md', import.meta.url));
const extractPath = fileURLToPath(
  new URL('../dist/changelog/changelog-extract.json', import.meta.url),
);
const changelog = readFileSync(changelogPath, 'utf8');
const versionRegex = /## \[(\d+\.\d+\.\d+.*?)\]\(/g;

if (positionals[0] === 'extract') {
  const latestMatch = versionRegex.exec(changelog);
  const previousMatch = versionRegex.exec(changelog);
  mkdirSync(dirname(extractPath), { recursive: true });
  console.log(`Extracting changelog for version ${latestMatch![1]}...`);
  writeFileSync(
    extractPath,
    JSON.stringify({
      [latestMatch![1]]: changelog.substring(latestMatch!.index, previousMatch!.index),
    }),
    'utf8',
  );
} else if (positionals[0] === 'insert') {
  if (!existsSync(extractPath)) {
    throw new Error(
      `Extracted changelog not found at ${extractPath}. Please run "extract" command first.`,
    );
  }

  const extractedChangelog = JSON.parse(readFileSync(extractPath, 'utf8'));
  const extractedVersion = Object.keys(extractedChangelog)[0];
  const extractedContent = extractedChangelog[extractedVersion];
  const latestMatch = versionRegex.exec(changelog);

  if (changelog.includes(`## [${extractedVersion}]`)) {
    console.log(
      `Changelog for version ${extractedVersion} already exists in ${changelogPath}. Skipping insertion.`,
    );
  } else {
    console.log(`Inserting changelog for version ${extractedVersion}...`);
    const updatedChangelog =
      changelog.substring(0, latestMatch!.index) +
      extractedContent +
      changelog.substring(latestMatch!.index);
    writeFileSync(changelogPath, updatedChangelog, 'utf8');
  }
} else {
  throw new Error(`Unknown command ${positionals[0]}`);
}
