import { readFileSync } from 'node:fs';

import * as glob from 'glob';

const patternDefinitions = 'src/**/*.scss';
const patternToCompare = 'src/**/*.{scss,ts,svg}';
const varRegex = /--([a-zA-Z0-9-_]+)\s*:/g;
const varCount: Record<string, number> = {};

const cssVars: string[] = [];

const definitionFiles = glob.sync(patternDefinitions, { ignore: 'node_modules/**' });

for (const file of definitionFiles) {
  const content = readFileSync(file, 'utf8');
  let match;
  while ((match = varRegex.exec(content)) !== null) {
    const varName = `--${match[1]}`;
    cssVars.push(varName);
  }
}

const files = glob.sync(patternToCompare, { ignore: 'node_modules/**' });
for (const file of files) {
  const content = readFileSync(file, 'utf8');

  cssVars.forEach((varName) => {
    const regex = new RegExp(`${varName.trim()}\\s*(?!:)`, 'g');
    const matches = regex.exec(content);
    varCount[varName] = (varCount[varName] || 0) + (matches?.length ?? 0);
  });
}

Object.entries(varCount)
  .filter(([_, count]) => count === 0)
  .forEach(([name]) => console.log(name));
