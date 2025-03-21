import { readFileSync } from 'node:fs';

interface Stats {
  size: number;
  cssSize: number;
  files: Record<string, { size: number; cssSize: number }>;
}

let previousStats: Stats | null = null;
let summary = '';
let text = '';
let title = 'Size Check';
try {
  const previousStatsURL = process.env.CI
    ? 'http://localhost:8050/lyne-stats.json'
    : 'https://lyne-storybook-dev.app.sbb.ch/lyne-stats.json';
  previousStats = (await fetch(previousStatsURL).then((r) => r.json())) as Stats;
} catch {
  /* empty */
}

const stats: Stats = JSON.parse(
  readFileSync(new URL(import.meta.resolve('../dist/storybook/lyne-stats.json')), 'utf8'),
);
if (previousStats) {
  title += `: Total diff ${stats.size - previousStats.size}, CSS diff ${stats.cssSize - previousStats.cssSize}`;
  summary = `
| Category | Size | Diff to main |
|----------|------|--------------|
| Total | ${stats.size} | ${stats.size - previousStats.size} |
| CSS | ${stats.cssSize} | ${stats.cssSize - previousStats.cssSize} |
`;
  text = `
| File | Size | Diff to main | CSS Size | Diff to main |
|------|------|--------------|----------|--------------|
`;
  const files = Object.keys(stats.files)
    .concat(Object.keys(previousStats.files))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  for (const file of files) {
    const size = stats.files[file]?.size ?? 0;
    const sizeDiff = size - (previousStats.files[file]?.size ?? 0);
    const cssSize = stats.files[file]?.cssSize ?? 0;
    const cssSizeDiff = cssSize - (previousStats.files[file]?.cssSize ?? 0);
    text += `| ${file} | ${size} | ${sizeDiff} | ${cssSize} | ${cssSizeDiff} |\n`;
  }
} else {
  summary = `
| Category | Size |
|----------|------|
| Total | ${stats.size} |
| CSS | ${stats.cssSize} |
`;
  text = `
| File | Size | CSS Size |
|------|------|----------|
`;
  for (const file of Object.keys(stats.files)) {
    const size = stats.files[file]?.size ?? 0;
    const cssSize = stats.files[file]?.cssSize ?? 0;
    text += `| ${file} | ${size} | ${cssSize} |\n`;
  }
}

export { summary, text, title as diff };
