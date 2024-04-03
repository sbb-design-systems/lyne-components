import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { parentPort, workerData } from 'worker_threads';

import { render } from '@lit-labs/ssr';
import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

if (parentPort === null) {
  throw new Error('worker.js must only be run in a worker thread');
}

const { template, modules } = workerData;
if (modules?.length) {
  const buildCacheOutDir = new URL(`../../dist/testout/${moduleHash(modules)}/`, import.meta.url);
  const moduleIndex = new URL('index.js', buildCacheOutDir).pathname;
  if (!existsSync(moduleIndex)) {
    await buildModules(buildCacheOutDir);
  }

  await import(moduleIndex);
}
// Dangerously spoof TemplateStringsArray by adding back the \`raw\` property
// property which gets stripped during serialization of the TemplateResult.
// This is needed to get through the check here
// https://github.com/lit/lit/blob/1fbd2b7a1e6da09912f5c681d2b6eaf1c4920bb4/packages/lit-html/src/lit-html.ts#L867
const strings = template.strings;
strings.raw = strings;
let rendered = '';
for (const str of render({ ...template, strings }, { deferHydration: true })) {
  rendered += str;
}
parentPort.postMessage(rendered);

/**
 * We are dynamically building the given modules, as Node.js cannot currently
 * use loaders in workers.
 * It works by creating a directory containing the hash
 * of all used modules and (recursive) imports of these modules
 * and building an index.js file, which is the result of the build.
 *
 * TODO: Remove once Node.js supports loading .ts files.
 */
async function buildModules(buildCacheOutDir) {
  mkdirSync(buildCacheOutDir, { recursive: true });

  const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));
  const entry = new URL('index.ts', buildCacheOutDir).pathname;
  const importStatement = modules
    .map((m) => `export * from '${relative(buildCacheOutDir.pathname, m)}';`)
    .join('\n');
  writeFileSync(entry, importStatement, 'utf8');

  await esbuild.build({
    entryPoints: [entry],
    outdir: buildCacheOutDir.pathname,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    external: Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }),
    logLevel: 'warning',
    plugins: [
      sassPlugin({
        type: 'lit-css',
        loadPaths: [
          new URL('../../', import.meta.url).pathname,
          new URL('../../node_modules/', import.meta.url).pathname,
        ],
      }),
    ],
  });
}

/** Generate a hash from the contents of the given modules and their import chain. */
function moduleHash(modules) {
  const fileMap = new Map();
  modules.forEach((m) => resolveImports(m, fileMap));
  return Array.from(fileMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((f) => f[1])
    .reduce((current, next) => current.update(next), createHash('sha256'))
    .digest('hex');
}

/** Resolve all used import/files recursively starting from the given file. */
function resolveImports(file, fileMap) {
  const content = readFileSync(file, 'utf8');
  fileMap.set(file, content);

  const dir = dirname(file);
  [...content.matchAll(/from '(\.[^']+)|import '(.[^']+)/g)]
    .map((m) => m[1] ?? m[2])
    .filter((m) => !m.includes('?'))
    .map((m) => resolve(dir, m))
    .flatMap((m) => [`${m}.ts`, join(m, 'index.ts')].filter((f) => existsSync(f)))
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter((m) => !fileMap.has(m))
    .sort()
    .forEach((m) => resolveImports(m, fileMap));
}
