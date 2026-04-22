/* eslint-disable import-x/no-named-as-default-member */
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { registerHooks } from 'node:module';
import { EOL } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { initCompiler } from 'sass';
import ts from 'typescript';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const rootHref = new URL('../../', import.meta.url).href;
const tsconfigFile = join(projectRoot, 'tsconfig.json');
const cachePath = join(projectRoot, 'node_modules', '.cache', 'node-hook-typescript-transform');
mkdirSync(cachePath, { recursive: true });
// Remove stale caches (older than a week)
const staleDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
readdirSync(cachePath, { withFileTypes: true })
  .filter((d) => d.isFile() && statSync(join(cachePath, d.name)).mtime < staleDate)
  .forEach((d) => rmSync(join(cachePath, d.name)));

// TypeScript
const result = ts.readConfigFile(tsconfigFile, ts.sys.readFile);
if (result.error) {
  throw new Error(`Error reading ${tsconfigFile}: ${result.error.messageText}`);
}
const config = ts.parseJsonConfigFileContent(
  result.config,
  ts.sys,
  dirname(tsconfigFile),
  undefined,
  basename(tsconfigFile),
);
config.options.module = ts.ModuleKind.ESNext;
config.options.moduleResolution = ts.ModuleResolutionKind.Bundler;
config.options.rewriteRelativeImportExtensions = false;
const jsonifiedOptions = JSON.stringify(config.options);

// Aliases
const aliases = Object.entries(config.options.paths || {})
  .filter(([alias]) => !alias.includes('*'))
  .map(([alias, paths]) => ({ alias, path: resolve(projectRoot, paths[0]) }));

// Sass
const sassCompiler = initCompiler();
const compileSass = (fileUrl: string): string =>
  sassCompiler
    .compile(fileURLToPath(fileUrl), {
      loadPaths: ['.', './node_modules/'],
      importers: [
        {
          findFileUrl(url, _context) {
            if (url.includes('node_modules')) {
              return null;
            }

            for (const { alias, path } of aliases) {
              if (url.startsWith(alias)) {
                const resolvedUrl = url.replace(alias, path);
                return new URL(resolvedUrl, import.meta.url);
              }
            }
            return null;
          },
        },
      ],
    })
    .css.replace(/`/g, '\\`')
    .replace(/\\(?!`)/g, '\\\\');

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@sbb-esta/lyne-')) {
      for (const { alias, path } of aliases) {
        if (specifier.startsWith(alias)) {
          const url = new URL(specifier.replace(alias, path).replace(/\.js$/, '.ts'), rootHref)
            .href;
          return { format: 'module', shortCircuit: true, url };
        }
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (!url.startsWith(rootHref) || url.includes('/node_modules/')) {
      return nextLoad(url, context);
    } else if (url.includes('?raw')) {
      const content = readFileSync(new URL(url), 'utf8');
      const source = `export default \`${content.replace(/`/g, '\\`')}\`;`;
      return { format: 'module', shortCircuit: true, source };
    } else if (url.includes('.scss?')) {
      const source = `import { css } from 'lit';\nexport default css\`${compileSass(url)}\`;`;
      return { format: 'module', shortCircuit: true, source };
    } else if (url.endsWith('.ts')) {
      const file = fileURLToPath(url);
      const code = readFileSync(file, 'utf8');

      const key = jsonifiedOptions + code;
      const hash = createHash('sha256').update(key).digest('hex');
      const cacheFilePath = join(cachePath, hash);
      if (existsSync(cacheFilePath)) {
        utimesSync(cacheFilePath, new Date(), new Date());
        const source = readFileSync(cacheFilePath, 'utf-8');
        return { format: 'module', shortCircuit: true, source };
      }

      try {
        const transpileResult = ts.transpileModule(code, {
          compilerOptions: { ...config.options, sourceMap: true, inlineSourceMap: true },
          fileName: file,
          transformers: {
            after: [
              // We want to replace import.meta.env usages with constants.
              // @ts-expect-error The typings are not fully correct, but it is the intended usage.
              (context) => (sourceFile: ts.SourceFile) => {
                const visitor = (node: ts.Node): ts.Node => {
                  if (
                    ts.isPropertyAccessExpression(node) &&
                    ts.isPropertyAccessExpression(node.expression) &&
                    ts.isMetaProperty(node.expression.expression) &&
                    ts.isIdentifier(node.expression.name) &&
                    node.expression.name.escapedText === 'env'
                  ) {
                    return node.name.escapedText === 'DEV'
                      ? context.factory.createTrue()
                      : context.factory.createFalse();
                  }

                  return ts.visitEachChild(node, visitor, context);
                };

                return ts.visitNode(sourceFile, visitor);
              },
            ],
          },
        });

        writeFileSync(cacheFilePath, transpileResult.outputText);
        return { format: 'module', shortCircuit: true, source: transpileResult.outputText };
      } catch (error) {
        throw typeof error === 'string' || error instanceof Error
          ? error
          : ts.flattenDiagnosticMessageText(error as ts.DiagnosticMessageChain, EOL);
      }
    }
    return nextLoad(url, context);
  },
});
