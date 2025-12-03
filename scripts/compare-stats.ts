import { readFileSync } from 'node:fs';

const isManuallyRun = process.argv[1].includes('compare-stats.ts');

interface Stats {
  jsSize: number;
  jsBrotliSize: number;
  jsGzipSize: number;
  jsCssSize: number;
  cssSize: number;
  cssBrotliSize: number;
  cssGzipSize: number;
  cssFiles: Record<string, { size: number; gzipSize: number; brotliSize: number }>;
  jsFiles: Record<string, { size: number; cssSize?: number; gzipSize: number; brotliSize: number }>;
}

let previousStats: Stats | null = null;
let summary: string;
let text: string;
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
  const jsDiff = stats.jsSize - previousStats.jsSize;
  const cssDiff = stats.cssSize - previousStats.cssSize;
  const jsCssDiff = stats.jsCssSize - previousStats.jsCssSize;
  const withSign = (value: number): string => `${value < 0 ? '' : '+'}${value}`;
  title += `: JS ${withSign(jsDiff)}, CSS ${withSign(cssDiff)}, CSS in JS ${withSign(jsCssDiff)}`;
  const jsBrotliDiff = stats.jsBrotliSize - previousStats.jsBrotliSize;
  const jsGzipDiff = stats.jsGzipSize - previousStats.jsGzipSize;
  const cssBrotliDiff = stats.cssBrotliSize - previousStats.cssBrotliSize;
  const cssGzipDiff = stats.cssGzipSize - previousStats.cssGzipSize;
  summary = `
| Category | Size | Brotli | Gzip |
|----------|------|--------|------|
| JS | ${stats.jsSize} (${jsDiff}) | ${stats.jsBrotliSize} (${jsBrotliDiff}) | ${stats.jsGzipSize} (${jsGzipDiff}) |
| CSS | ${stats.cssSize} (${cssDiff}) | ${stats.cssBrotliSize} (${cssBrotliDiff}) | ${stats.cssGzipSize} (${cssGzipDiff}) |
| CSS in JS | ${stats.jsCssSize} (${jsCssDiff}) | | |
`;
  text = `
| File | Size | Brotli | Gzip |
|------|------|--------|------|
`;
  const cssFiles = Object.keys(stats.cssFiles)
    .concat(Object.keys(previousStats.cssFiles))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  for (const file of cssFiles) {
    const size = stats.cssFiles[file]?.size ?? 0;
    const sizeDiff = size - (previousStats.cssFiles[file]?.size ?? 0);
    const brotliSize = stats.cssFiles[file]?.brotliSize ?? 0;
    const brotliSizeDiff = brotliSize - (previousStats.cssFiles[file]?.brotliSize ?? 0);
    const gzipSize = stats.cssFiles[file]?.gzipSize ?? 0;
    const gzipSizeDiff = gzipSize - (previousStats.cssFiles[file]?.gzipSize ?? 0);
    if (sizeDiff !== 0) {
      text += `| ${file} | ${size} (${sizeDiff}) | ${brotliSize} (${brotliSizeDiff}) | ${gzipSize} (${gzipSizeDiff}) |\n`;
    }
  }
  text += `

| File | Size | Brotli | Gzip | CSS Size |
|------|------|--------|------|----------|
`;
  const jsFiles = Object.keys(stats.jsFiles)
    .concat(Object.keys(previousStats.jsFiles))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  for (const file of jsFiles) {
    const size = stats.jsFiles[file]?.size ?? 0;
    const sizeDiff = size - (previousStats.jsFiles[file]?.size ?? 0);
    const brotliSize = stats.jsFiles[file]?.brotliSize ?? 0;
    const brotliSizeDiff = brotliSize - (previousStats.jsFiles[file]?.brotliSize ?? 0);
    const gzipSize = stats.jsFiles[file]?.gzipSize ?? 0;
    const gzipSizeDiff = gzipSize - (previousStats.jsFiles[file]?.gzipSize ?? 0);
    const cssSize = stats.jsFiles[file]?.cssSize ?? 0;
    const cssSizeDiff = cssSize - (previousStats.jsFiles[file]?.cssSize ?? 0);
    if (sizeDiff !== 0) {
      text += `| ${file} | ${size} (${sizeDiff}) | ${brotliSize} (${brotliSizeDiff}) | ${gzipSize} (${gzipSizeDiff}) | ${cssSize} (${cssSizeDiff}) |\n`;
    }
  }
} else {
  summary = `
| Category | Size | Brotli | Gzip |
|----------|------|--------|------|
| JS | ${stats.jsSize} | ${stats.jsBrotliSize} | ${stats.jsGzipSize} |
| CSS | ${stats.cssSize} | ${stats.cssBrotliSize} | ${stats.cssGzipSize} |
| CSS in JS | ${stats.jsCssSize} | | |
`;
  text = `
| File | Size | Brotli | Gzip |
|------|------|--------|------|
`;
  const cssFiles = Object.keys(stats.cssFiles)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  for (const file of cssFiles) {
    const size = stats.cssFiles[file]?.size ?? 0;
    const brotliSize = stats.cssFiles[file]?.brotliSize ?? 0;
    const gzipSize = stats.cssFiles[file]?.gzipSize ?? 0;
    text += `| ${file} | ${size} | ${brotliSize} | ${gzipSize} |\n`;
  }
  text += `

| File | Size | Brotli | Gzip | CSS Size |
|------|------|--------|------|----------|
`;
  for (const file of Object.keys(stats.jsFiles)) {
    const size = stats.jsFiles[file]?.size ?? 0;
    const brotliSize = stats.jsFiles[file]?.brotliSize ?? 0;
    const gzipSize = stats.jsFiles[file]?.gzipSize ?? 0;
    const cssSize = stats.jsFiles[file]?.cssSize ?? 0;
    text += `| ${file} | ${size} | ${brotliSize} | ${gzipSize} | ${cssSize} |\n`;
  }
}

if (isManuallyRun) {
  console.log(summary);
  console.log(text);
}

export { summary, text, title };
