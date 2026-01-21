import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const htmlFiles = ['../dist/storybook/index.html', '../dist/storybook/iframe.html']
  .map((file) => readFileSync(new URL(file, import.meta.url), 'utf8'))
  .join('\n');

const shaVersion = 'sha256' as const;
const toPlainArray = (matches: RegExpStringIterator<RegExpMatchArray>): string[] =>
  Array.from(matches).map((match) => match[1]);
const scriptHash = toPlainArray(htmlFiles.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi))
  .map((script) => `'${shaVersion}-${createHash(shaVersion).update(script).digest('base64')}'`)
  .join(' ');

mkdirSync(new URL('../dist/storybook-nginx', import.meta.url), { recursive: true });
const configTemplate = readFileSync(new URL('../.github/default.conf', import.meta.url), 'utf8');
writeFileSync(
  new URL('../dist/storybook-nginx/default.conf', import.meta.url),
  configTemplate.replace(`script-src 'self';`, `script-src 'self' ${scriptHash};`),
  'utf8',
);
