import { globSync, readFileSync } from 'node:fs';

const definitionsGlob = 'src/**/*.scss';
const usagesGlob = 'src/**/*.{scss,ts,svg}';
const varRegex = /--([a-zA-Z0-9-_]+)\s*:/g;
const cssVarNames: string[] = [];
const cssVarUsagesCount: Record<string, number> = {};

const definitionFiles = globSync(definitionsGlob);

for (const file of definitionFiles) {
  const content = readFileSync(file, 'utf8');
  let match;
  while ((match = varRegex.exec(content)) !== null) {
    cssVarNames.push(`--${match[1]}`);
  }
}

const usagesFiles = globSync(usagesGlob);
for (const file of usagesFiles) {
  const content = readFileSync(file, 'utf8');

  cssVarNames.forEach((varName) => {
    const regex = new RegExp(`${varName.trim()}\\s*(?!:)`, 'g');
    const matches = regex.exec(content);
    cssVarUsagesCount[varName] = (cssVarUsagesCount[varName] || 0) + (matches?.length ?? 0);
  });
}

Object.entries(cssVarUsagesCount)
  .filter(([_, count]) => count === 0)
  .forEach(([name]) => console.log(name));
