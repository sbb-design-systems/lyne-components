/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { createHash } from 'node:crypto';
import {
  cpSync,
  existsSync,
  globSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { registerHooks } from 'node:module';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs, promisify } from 'node:util';
import { brotliCompress, gzip } from 'node:zlib';

import { cli as customElementManifestCli } from '@custom-elements-manifest/analyzer/cli.js';
import checkbox, { Separator } from '@inquirer/checkbox';
import type { CustomElementDeclaration, Export, Module, Package } from 'custom-elements-manifest';
import MagicString from 'magic-string';
import postcss from 'postcss';
import * as sass from 'sass';
import { buildStaticStandalone } from 'storybook/internal/core-server';
import * as ts from 'typescript';
import { build, type InlineConfig, mergeConfig, type Plugin, type PluginOption } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

import { lightDarkPlugin, statePlugin } from '../tools/postcss/index.ts';
import globalConfig from '../vite.config.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const currentDirectory = fileURLToPath(new URL('./', import.meta.url));
const distDirectory = join(projectRoot, 'dist');
const isCI = !!process.env.CI;
const entrypointMarker = `/**
 * @entrypoint
 */
`;
const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);
const calculateGzipSize = async (content: string): Promise<number> =>
  (await gzipAsync(content)).length;
const calculateBrotliSize = async (content: string): Promise<number> =>
  (await brotliAsync(content)).length;
const { positionals } = parseArgs({ allowPositionals: true });
const buildTargets = new Set(positionals);

registerHooks({
  resolve: (specifier, context, nextResolve) =>
    nextResolve(
      specifier.includes('@sbb-esta/lyne-')
        ? join(distDirectory, specifier.replace('@sbb-esta/lyne-', ''))
        : specifier,
      context,
    ),
});

class FileEntry {
  #content: string | undefined;
  readonly path: string;
  get content(): string {
    if (this.#content === undefined) {
      this.#content = readFileSync(this.path, 'utf8');
    }
    return this.#content;
  }

  constructor(path: string) {
    this.path = path;
  }
}

type StepResult = void | Promise<void> | Disposable | Promise<Disposable>;

interface Builder extends Disposable {
  build(): Promise<void>;
}

class PackageBuilder implements Builder {
  #steps: ((pkg: PackageBuilder) => StepResult)[];
  #results: Disposable[] = [];
  readonly name: string;
  readonly root: string;
  readonly production: boolean;
  readonly outDir: string;
  readonly files: FileEntry[];
  get tsFiles(): FileEntry[] {
    return this.files.filter((f) => f.path.endsWith('.ts'));
  }

  constructor(name: string, steps: ((pkg: PackageBuilder) => StepResult)[]) {
    this.name = name;
    this.#steps = steps;
    const [dirName, mode] = name.split(':');
    this.production = mode !== 'development';
    this.root = join(projectRoot, 'src', dirName);
    this.outDir = join(distDirectory, basename(this.root), this.production ? '' : 'development');
    this.files = !mode
      ? []
      : readdirSync(this.root, { withFileTypes: true, recursive: true })
          .filter(
            (d) =>
              !['vite.config.ts', 'private.ts'].includes(d.name) &&
              ['.spec.ts', '.stories.ts', '.private.ts'].every((e) => !d.name.endsWith(e)) &&
              !relative(projectRoot, join(d.parentPath, d.name)).includes('/private/') &&
              !relative(projectRoot, join(d.parentPath, d.name)).includes('/interfaces/'),
          )
          .map((d) => new FileEntry(join(d.parentPath, d.name)));
  }

  async build(): Promise<void> {
    for (const step of this.#steps) {
      const result = await step(this);
      if (result) {
        this.#results.push(result);
      }
    }
  }

  [Symbol.dispose](): void {
    for (const result of this.#results) {
      result[Symbol.dispose]();
    }
    console.log(`=> Finished building ${this.name}`);
  }
}

function* iterate(node: ts.Node): Generator<ts.Node, void, unknown> {
  yield node;
  const childNodes: ts.Node[] = [];
  ts.forEachChild(node, (n) => {
    childNodes.push(n);
  });
  for (const childNode of childNodes) {
    yield* iterate(childNode);
  }
}

const elementsDevelopment = 'elements:development';
const elementsProduction = 'elements:production';
const elementsExperimentalDevelopment = 'elements-experimental:development';
const elementsExperimentalProduction = 'elements-experimental:production';
const reactDevelopment = 'react:development';
const reactProduction = 'react:production';
const reactExperimentalDevelopment = 'react-experimental:development';
const reactExperimentalProduction = 'react-experimental:production';
const storybook = 'storybook';
const visualRegressionApp = 'visual-regression-app';

const expansions = {
  all: [
    elementsDevelopment,
    elementsProduction,
    elementsExperimentalDevelopment,
    elementsExperimentalProduction,
    reactDevelopment,
    reactProduction,
    reactExperimentalDevelopment,
    reactExperimentalProduction,
    storybook,
    visualRegressionApp,
  ],
  elements: [elementsProduction, elementsDevelopment],
  'elements-experimental': [elementsExperimentalProduction, elementsExperimentalDevelopment],
  react: [reactProduction, reactDevelopment],
  'react-experimental': [reactExperimentalProduction, reactExperimentalDevelopment],
};

const buildMap: Record<string, () => Builder> = {
  [elementsDevelopment]: () => new PackageBuilder(elementsDevelopment, [buildLibrary]),
  [elementsProduction]: () =>
    new PackageBuilder(elementsProduction, [
      buildLibrary,
      buildRootIndex,
      buildStyles,
      buildSassLibrary,
      buildCustomElementsManifest,
      copyReadme,
      buildPackageJson,
      verifyEntryPoints,
    ]),
  [elementsExperimentalDevelopment]: () =>
    new PackageBuilder(elementsExperimentalDevelopment, [buildLibrary]),
  [elementsExperimentalProduction]: () =>
    new PackageBuilder(elementsExperimentalProduction, [
      buildLibrary,
      buildRootIndex,
      buildCustomElementsManifest,
      copyReadme,
      buildPackageJson,
      verifyEntryPoints,
    ]),
  [reactDevelopment]: () =>
    new PackageBuilder(reactDevelopment, [generateReactWrappers, buildLibrary]),
  [reactProduction]: () =>
    new PackageBuilder(reactProduction, [
      generateReactWrappers,
      buildLibrary,
      copyReadme,
      buildPackageJson,
      verifyEntryPoints,
    ]),
  [reactExperimentalDevelopment]: () =>
    new PackageBuilder(reactExperimentalDevelopment, [generateReactWrappers, buildLibrary]),
  [reactExperimentalProduction]: () =>
    new PackageBuilder(reactExperimentalProduction, [
      generateReactWrappers,
      buildLibrary,
      copyReadme,
      buildPackageJson,
      verifyEntryPoints,
    ]),
  [storybook]: () =>
    new PackageBuilder(storybook, [buildStorybook, buildNginxConfig, buildSizeStats]),
  [visualRegressionApp]: () => new PackageBuilder(visualRegressionApp, [buildApp]),
  ['nginx-conf']: () => new PackageBuilder(storybook, [buildNginxConfig]),
};

if (!buildTargets.size && !isCI) {
  try {
    const answer = await checkbox({
      message: 'Select the build steps to run',
      choices: [
        { name: '@sbb-esta/lyne-elements', value: elementsProduction },
        { name: '@sbb-esta/lyne-elements (Development)', value: elementsDevelopment },
        { name: '@sbb-esta/lyne-elements-experimental', value: elementsExperimentalProduction },
        {
          name: '@sbb-esta/lyne-elements-experimental (Development)',
          value: elementsExperimentalDevelopment,
        },
        new Separator(),
        { name: '@sbb-esta/lyne-react', value: reactProduction },
        { name: '@sbb-esta/lyne-react (Development)', value: reactDevelopment },
        { name: '@sbb-esta/lyne-react-experimental', value: reactExperimentalProduction },
        {
          name: '@sbb-esta/lyne-react-experimental (Development)',
          value: reactExperimentalDevelopment,
        },
        new Separator(),
        { name: 'Storybook', value: storybook },
        { name: 'Visual Regression App', value: visualRegressionApp },
      ],
      pageSize: 100,
      required: true,
    });
    answer.forEach((a) => buildTargets.add(a));
  } catch {
    console.error('=> Aborted build selection');
    process.exit(0);
  }
} else if (!buildTargets.size) {
  buildTargets.add('all');
}

for (const [key, values] of Object.entries(expansions)) {
  if (buildTargets.has(key)) {
    values.forEach((value) => buildTargets.add(value));
    buildTargets.delete(key);
  }
}

for (const factory of Object.keys(buildMap)
  .filter((k) => buildTargets.has(k))
  .map((p) => buildMap[p])
  .filter((b) => !!b)) {
  using builder = factory();
  await builder.build();
}

async function buildLibrary(pkg: PackageBuilder): Promise<void> {
  if (existsSync(pkg.outDir)) {
    readdirSync(pkg.outDir, { withFileTypes: true })
      .filter((d) => !d.isDirectory() || d.name !== 'development')
      .forEach((d) => rmSync(join(pkg.outDir, d.name), { recursive: true, force: true }));
  }
  await build(
    mergeConfig(globalConfig, {
      root: pkg.root,
      mode: pkg.production ? 'production' : 'development',
      assetsInclude: ['_index.scss', 'core/styles/**/*.scss', 'README.md'],
      plugins: [stateTransform(), pkg.production ? [] : [dts()]].flat(),
      build: {
        lib: {
          entry: toEntryPoints(pkg),
          formats: ['es'],
        },
        outDir: pkg.outDir,
        cssMinify: pkg.production,
        minify: pkg.production,
        emptyOutDir: false,
        sourcemap: pkg.production ? false : 'inline',
        rollupOptions: {
          external(source: string, importer: string | undefined): boolean | undefined {
            if (
              source.match(
                /(^lit$|^lit\/|^@lit\/|^@lit-labs\/|^react|^tslib$|^@sbb-esta\/lyne-elements\/?|^@sbb-esta\/lyne-elements-experimental\/?|^@sbb-esta\/lyne-react\/?)/,
              ) ||
              (!!importer && source.startsWith('../') && !importer.includes('/node_modules/'))
            ) {
              if (source.includes('.scss')) {
                throw Error(`Do not import scss from another directory.
               Re export sass via barrel export (index.ts). See button/common.ts.
               Source: ${source}.
               Importer: ${importer}.`);
              }

              return true;
            }
          },
        },
      },
    } satisfies InlineConfig),
  );
}

async function buildApp(pkg: PackageBuilder): Promise<void> {
  rmSync(pkg.outDir, { recursive: true, force: true });
  const { default: config } = await import(
    relative(currentDirectory, join(pkg.root, 'vite.config.ts'))
  );
  await build(typeof config === 'function' ? config() : config);
}

async function buildStorybook(pkg: PackageBuilder): Promise<void> {
  await buildStaticStandalone({
    configDir: join(projectRoot, '.storybook'),
    outputDir: pkg.outDir,
    quiet: true,
    statsJson: true,
  });
}

function stateTransform(): PluginOption {
  return {
    name: 'state-transform',
    enforce: 'post',
    transform(code: string, id: string) {
      if (/.(js|ts)$/.test(id)) {
        const ms = new MagicString(code);
        ms.replaceAll(/:state\(([^)]+)\)/g, (_match, p1) => {
          return `:is(:state(${p1}),[state--${p1}])`;
        });
        return {
          code: ms.toString(),
          map: ms.generateMap({ hires: true }),
        };
      }
      return null;
    },
  };
}

function dts(): Plugin {
  return dtsPlugin({
    entryRoot: '.',
    exclude: ['**/(*.)?{stories,spec,private}.ts', '**/private/*', 'vite.config.ts'],
    pathsToAliases: false,
    strictOutput: false,
    aliasesExclude: [
      /^@sbb-esta\/lyne-elements\/?/,
      /^@sbb-esta\/lyne-elements-experimental\/?/,
      /^@sbb-esta\/lyne-react\/?/,
    ],
    afterDiagnostic(diagnostics) {
      if (diagnostics.length) {
        throw new Error('dts generation for react package failed! See logs for details.');
      }
    },
    beforeWriteFile: (filePath, content) => {
      if (content.includes('.scss?lit&inline') || content.includes('.scss?inline&lit')) {
        return {
          filePath,
          // Remove lines with scss modules
          content: content.replace(
            /export \{[^}]+\}\s+from\s+'[^']+\.scss\?(lit&inline|inline&lit)';\n?/gm,
            '',
          ),
        };
      }
    },
  });
}

function toEntryPoints(pkg: PackageBuilder): Record<string, string> {
  return pkg.tsFiles
    .map((f) => relative(pkg.root, f.path))
    .reduce(
      (current, next) =>
        Object.assign(current, { [join(dirname(next), basename(next, extname(next)))]: next }),
      {} as Record<string, string>,
    );
}

function buildRootIndex(pkg: PackageBuilder): void {
  const customElementMap = new Map<string, string[]>();
  for (const fileEntry of pkg.tsFiles) {
    const file = fileEntry.path;
    const content = readFileSync(file, 'utf8');
    if (content.includes('@customElement')) {
      const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ES2022, true);
      const customElements = sourceFile.statements
        .filter(
          (s): s is ts.ClassDeclaration =>
            ts.isClassDeclaration(s) &&
            !!s.modifiers?.some(
              (m) => ts.isDecorator(m) && m.getText().includes('@customElement'),
            ) &&
            !!s.name,
        )
        .map((c) => c.name!.getText())
        .sort();
      customElementMap.set(`./${relative(pkg.root, file).replace(/\.ts$/, '.js')}`, customElements);
    }
  }

  const imports = Array.from(customElementMap)
    .map(([path, symbols]) => `import { ${symbols.join(', ')} } from "${path}";\n`)
    .join('');
  const classSymbols = Array.from(customElementMap.values()).flat().sort();
  const globalAssignment = classSymbols.map((s) => `globalThis.${s} = ${s};\n`).join('');
  const typings = classSymbols.map((s) => `  var ${s}: ${s};\n`).join('');

  writeFileSync(
    join(pkg.outDir, 'index.js'),
    `${imports}\n${globalAssignment}\nexport {}\n`,
    'utf8',
  );
  writeFileSync(
    join(pkg.outDir, 'index.d.ts'),
    `${imports}declare global {\n${typings}}\n\nexport {}\n`,
    'utf8',
  );
  console.log(`=> Generated index files in ${relative(projectRoot, pkg.outDir)}`);
}

function buildStyles(pkg: PackageBuilder): void {
  const sheets = [
    { inputName: 'core/styles/a11y.scss', outputName: 'a11y.css' },
    { inputName: 'core/styles/animation.scss', outputName: 'animation.css' },
    { inputName: 'core/styles/badge.scss', outputName: 'badge.css' },
    { inputName: 'core/styles/core.scss', outputName: 'core.css' },
    { inputName: 'core/styles/disable-animation.scss', outputName: 'disable-animation.css' },
    {
      inputName: 'core/styles/font-characters-extension.scss',
      outputName: 'font-characters-extension.css',
    },
    { inputName: 'core/styles/layout.scss', outputName: 'layout.css' },
    { inputName: 'core/styles/lists.scss', outputName: 'lists.css' },
    { inputName: 'core/styles/normalize.scss', outputName: 'normalize.css' },
    { inputName: 'core/styles/off-brand-theme.scss', outputName: 'off-brand-theme.css' },
    {
      inputName: 'core/styles/safety-theme.scss',
      outputName: 'safety-theme.css',
    },
    { inputName: 'core/styles/scrollbar.scss', outputName: 'scrollbar.css' },
    { inputName: 'core/styles/standard-theme.scss', outputName: 'standard-theme.css' },
    { inputName: 'core/styles/table.scss', outputName: 'table.css' },
    { inputName: 'core/styles/timetable-form.scss', outputName: 'timetable-form.css' },
    { inputName: 'core/styles/typography.scss', outputName: 'typography.css' },
  ];
  for (const entry of sheets) {
    const compiled = sass.compile(join(pkg.root, entry.inputName), {
      loadPaths: [projectRoot, join(projectRoot, '/node_modules/')],
    });
    const result = postcss([lightDarkPlugin, statePlugin]).process(compiled.css);
    writeFileSync(join(pkg.outDir, entry.outputName), result.css, 'utf8');
  }
  console.log(`=> Built styles in ${relative(projectRoot, pkg.outDir)}`);
}

function buildSassLibrary(pkg: PackageBuilder): void {
  const sassFiles = pkg.files
    .filter((f) => f.path.endsWith('.scss'))
    .filter(
      (f) =>
        basename(f.path) === '_index.scss' || relative(pkg.root, f.path).startsWith('core/styles/'),
    );
  for (const fileEntry of sassFiles) {
    const relativePath = relative(pkg.root, fileEntry.path);
    let content = fileEntry.content;
    const dir = dirname(join(pkg.outDir, relativePath));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    if (content.includes('@use') || content.includes('@import')) {
      content = content.replace(
        /(@use|@import) '((?!\.|sass:)[^']+)'/g,
        (_m, useOrImport, useFile: string) => {
          useFile = join('node_modules', useFile);
          const outFile = join(dir, useFile.replaceAll('/', '_'));
          cpSync(join(projectRoot, useFile), outFile);
          return `${useOrImport} './${basename(outFile)}'`;
        },
      );
    }
    writeFileSync(join(pkg.outDir, relativePath), content, 'utf8');
  }
  console.log(`=> Built SASS library in ${relative(projectRoot, pkg.outDir)}`);
}

async function buildCustomElementsManifest(pkg: PackageBuilder | string): Promise<void> {
  await customElementManifestCli({
    argv: [
      'analyze',
      '--config',
      join(
        projectRoot,
        'tools',
        'manifest',
        `${typeof pkg === 'string' ? pkg : basename(pkg.root)}-custom-elements-manifest.config.ts`,
      ),
    ],
    cwd: projectRoot,
  });
}

function copyReadme(pkg: PackageBuilder): void {
  const maybeReadme = join(pkg.root, 'README.md');
  cpSync(
    existsSync(maybeReadme) ? maybeReadme : join(projectRoot, 'README.md'),
    join(pkg.outDir, 'README.md'),
  );
  console.log(`=> Copied README.md to ${relative(projectRoot, pkg.outDir)}`);
}

function buildPackageJson(pkg: PackageBuilder): void {
  const exportsExtensions = basename(pkg.root).includes('react') ? ['', '.js'] : ['.js'];
  const rootPackageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
  const litVersion = rootPackageJson.dependencies.lit.match(/\d+\.\d+\.\d+/);
  const litObserversVersion =
    rootPackageJson.devDependencies['@lit-labs/observers'].match(/\d+\.\d+\.\d+/);
  const litReactVersion = rootPackageJson.devDependencies['@lit/react'].match(/\d+\.\d+\.\d+/);
  const tslibVersion = rootPackageJson.devDependencies.tslib.match(/\d+\.\d+\.\d+/);

  const packageJsonContent = readFileSync(join(pkg.root, 'package.json'), 'utf8')
    .replaceAll('0.0.0-PLACEHOLDER', rootPackageJson.version)
    .replaceAll('0.0.0-LITOBSERVERS', `^${litObserversVersion}`)
    .replaceAll('0.0.0-LITREACT', `^${litReactVersion}`)
    .replaceAll('0.0.0-TSLIB', `^${tslibVersion}`)
    .replaceAll('0.0.0-LIT', `^${litVersion}`);
  const packageJson = JSON.parse(packageJsonContent);
  for (const key of ['author', 'license', 'repository', 'bugs']) {
    packageJson[key] = rootPackageJson[key];
  }

  packageJson.exports = pkg.tsFiles
    .filter((f) => f.content.includes('@entrypoint'))
    .map((f) => relative(pkg.root, f.path))
    .map((f) => f.replace(/\.ts$/, ''))
    .sort()
    .reduce(
      (current, next) =>
        Object.assign(
          current,
          ...exportsExtensions.map((ext) => ({
            [`./${next}${ext}`]: {
              types: `./development/${next}.d.ts`,
              development: `./development/${next}.js`,
              default: `./${next}.js`,
            },
          })),
        ),
      {
        ...packageJson.exports,
        ...readdirSync(pkg.outDir, { withFileTypes: true })
          .filter((f) => f.isFile() && f.name.endsWith('.css'))
          .reduce(
            (r, f) =>
              Object.assign(r, {
                [`./${f.name}`]: {
                  style: `./${f.name}`,
                  default: `./${f.name}`,
                },
              }),
            {} as Record<string, Record<string, string>>,
          ),
        './package.json': { default: './package.json' },
      } as Record<string, Record<string, string>>,
    );

  writeFileSync(join(pkg.outDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');

  console.log(`=> Built package.json in ${relative(projectRoot, pkg.outDir)}`);
}

async function verifyEntryPoints(pkg: PackageBuilder): Promise<void> {
  const packageJson = JSON.parse(readFileSync(join(pkg.outDir, 'package.json'), 'utf8'));
  const exports = Object.keys(packageJson.exports)
    .map((p) => resolve(pkg.outDir, p))
    .filter((p) => extname(p) === '.js');
  for (const entryPoint of exports) {
    await import(relative(currentDirectory, entryPoint).replaceAll('\\', '/'));
  }

  console.log(`=> Verified entry points in ${relative(projectRoot, pkg.outDir)}`);
}

async function generateReactWrappers(pkg: PackageBuilder): Promise<Disposable> {
  const pairedPackage = basename(pkg.root).replace('react', 'elements');
  if (!existsSync(join(projectRoot, 'src', pairedPackage))) {
    throw new Error(`Could not find paired package for react wrappers: ${pairedPackage}`);
  }

  const manifestPath = join(distDirectory, pairedPackage, 'custom-elements.json');
  if (!existsSync(manifestPath)) {
    await buildCustomElementsManifest(pairedPackage);
  }

  const manifest: Package = JSON.parse(readFileSync(manifestPath, 'utf8'));

  const generatedPaths: string[] = [];
  function createDir(dir: string): void {
    if (!existsSync(dir)) {
      createDir(dirname(dir));
      generatedPaths.push(dir);
      mkdirSync(dir);
    }
  }

  const exports = manifest.modules.reduce(
    (current, next) => current.concat(next.exports ?? []),
    [] as Export[],
  );
  for (const module of manifest.modules.filter((m) => !m.path.startsWith('core/'))) {
    for (const declaration of module.declarations?.filter(
      (d): d is CustomElementDeclaration => 'customElement' in d && d.customElement,
    ) ?? []) {
      const entryPoint = module.path.replace(/.js$/, '.ts');
      const targetPath = join(pkg.root, entryPoint);
      createDir(dirname(targetPath));
      const reactTemplate = renderTemplate(declaration, module, exports, pairedPackage);
      generatedPaths.push(targetPath);
      writeFileSync(targetPath, reactTemplate, 'utf8');
      pkg.files.push(new FileEntry(targetPath));
    }
  }

  for (const dirent of readdirSync(pkg.root, {
    withFileTypes: true,
    recursive: true,
  }).filter((d) => d.isDirectory())) {
    const dir = join(dirent.parentPath, dirent.name);
    const relativeDir = relative(pkg.root, dir);
    const entryPoint = `${relativeDir}.ts`;
    const dirEntryPoint = join(pkg.root, entryPoint);

    if (!existsSync(dirEntryPoint)) {
      generatedPaths.push(dirEntryPoint);
      const directories = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
      const files = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile());
      const content =
        entrypointMarker +
        (directories.length ? directories : files)
          .map((d) => `export * from './${dirent.name}/${d.name.replace(/\.ts$/, '')}.js';\n`)
          .join('');
      writeFileSync(dirEntryPoint, content, 'utf8');
      pkg.files.push(new FileEntry(dirEntryPoint));
    }
  }

  return {
    [Symbol.dispose]() {
      for (const path of generatedPaths.sort((a, b) => b.length - a.length)) {
        try {
          if (statSync(path).isDirectory()) {
            rmSync(path, { recursive: true, force: true });
          } else {
            unlinkSync(path);
          }
        } catch {
          /* empty */
        }
      }
    },
  };
}

function renderTemplate(
  declaration: CustomElementDeclaration,
  module: Module,
  exports: Export[],
  library: string,
): string {
  const dirDepth = module.path.split('/').length - 1;
  const coreImportPath =
    library === 'elements'
      ? `${!dirDepth ? './' : '../'.repeat(dirDepth)}core.js`
      : `@sbb-esta/lyne-react/core.js`;
  const importPath = module.path.substring(0, module.path.lastIndexOf('/')) + '.js';
  const componentsImports = new Map<string, string[]>().set(importPath, [declaration.name]);

  if (declaration.events?.some((e) => !e.type)) {
    console.error(`(Inherited) events need jsdocs on class level! (${declaration.name})`);
  }

  // Generic <T> types and Sbb* events are filtered out from imports
  const customEventTypes = [
    ...(declaration.events?.filter((e) => e.type.text.startsWith('Sbb')).map((e) => e.type.text) ??
      []),
    ...(declaration.events
      ?.filter(
        (e) =>
          e.type.text.startsWith('CustomEvent<') &&
          ['void', '{', 'File', 'T'].every((m) => !e.type.text.includes(`<${m}`)),
      )
      .map((e) => e.type.text.substring(12).slice(0, -1)) ?? []),
  ]
    .sort()
    .filter((v, i, a) => a.indexOf(v) === i && v.length > 1);

  // If a type or interface needs to be imported, the custom elements analyzer will not detect/extract these,
  // and therefore we need to have a manual list of required types/interfaces.
  const interfaces = new Map<string, string>()
    .set('SbbOverlayCloseEventDetails', 'core/interfaces.js')
    .set('SbbPaginatorPageEventDetails', 'core/interfaces.js')
    .set('SeatReservationPlaceSelection', 'seat-reservation/common.js')
    .set('SeatReservationSelectedCoach', 'seat-reservation/common.js')
    .set('SeatReservationSelectedPlaces', 'seat-reservation/common.js')
    .set('PlaceSelection', 'seat-reservation/common.js');

  // In case of properties that are not string, but can be used as a string attribute in
  // React (e.g. trigger), we need to patch the class property types to allow string as
  // an additional type. We do this by checking for HTML*Element or Sbb*Element property
  // types, which usually support id references as attributes. If a class has these
  // kind of properties, we generate a declaration class, which force string as an
  // additional type for the property. This is needed, because React does not support
  // passing a string as a property assignment, if the type does not include string.
  const idRefProperties =
    declaration.members?.filter(
      (m) =>
        'attribute' in m &&
        m.kind === 'field' &&
        m.privacy === 'public' &&
        !m.readonly &&
        m.type?.text?.match(/(Sbb|HTML)[a-zA-Z]*Element/),
    ) ?? [];
  const patchClassName = declaration.name.replace(/Element$/, 'Component');
  const memberPatchClass = idRefProperties.length
    ? `

declare class ${patchClassName}Type extends ${declaration.name} {${idRefProperties
        .map(
          (m) =>
            `
  // @ts-expect-error Add string to type
  public set ${m.name}(value: string | ${declaration.name}['${m.name}']) {
    super.${m.name} = value as any;
  }
  // @ts-expect-error Add string to type
  public get ${m.name}(): string | ${declaration.name}['${m.name}'] {
    return super.${m.name};
  }
`,
        )
        .join('')}
}
const ${patchClassName} = ${declaration.name} as typeof ${patchClassName}Type;
`
    : '';

  for (const customEventType of customEventTypes) {
    const exportModule = exports.find((e) => e.name === customEventType);
    if (exportModule) {
      if (!componentsImports.has(importPath!)) {
        componentsImports.set(importPath!, [`type ${customEventType}`]);
      } else {
        componentsImports.get(importPath!)!.push(`type ${customEventType}`);
      }
    } else if (interfaces.has(customEventType)) {
      const moduleName = interfaces.get(customEventType)!;
      if (!componentsImports.has(moduleName)) {
        componentsImports.set(moduleName, [`type ${customEventType}`]);
      } else {
        componentsImports.get(moduleName)!.push(`type ${customEventType}`);
      }
    } else {
      componentsImports.get(importPath)!.push(`type ${customEventType}`);
    }
  }
  const reactTemplate = `/* autogenerated */
import { createComponent${declaration.events?.length ? ', type EventName' : ''} } from '${coreImportPath}';
${Array.from(componentsImports)
  .map(
    ([key, imports]) => `import { ${imports.join(', ')} } from '@sbb-esta/lyne-${library}/${key}';`,
  )
  .join('\n')}
import react from 'react';${memberPatchClass}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ${declaration.name.replace(/Element$/, '')} = createComponent({
  tagName: '${
    // eslint-disable-next-line lyne/local-name-rule
    declaration.tagName
  }',
  elementClass: ${memberPatchClass ? patchClassName : declaration.name},
  react,${
    declaration.events
      ? `
  events: {${declaration
    .events!.map(
      (e) =>
        `\n    'on${e.name.charAt(0).toUpperCase() + e.name.slice(1)}': '${e.name}' as EventName<${e.type.text.replace(
          /<T\s*(\|\s*T\[\])?\s*>/g,
          '<any>',
        )}>,`,
    )
    .join('')}
  },
`
      : ''
  }
});
`;
  return reactTemplate;
}

function buildNginxConfig(pkg: PackageBuilder): void {
  const htmlFiles = readdirSync(pkg.outDir, { withFileTypes: true, recursive: true })
    .filter((d) => d.isFile() && d.name.endsWith('.html'))
    .map((d) => readFileSync(join(d.parentPath, d.name), 'utf8'))
    .join('\n');

  const shaVersion = 'sha256' as const;
  const toPlainArray = (matches: RegExpStringIterator<RegExpMatchArray>): string[] =>
    Array.from(matches).map((match) => match[1]);
  const scriptHash = toPlainArray(htmlFiles.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi))
    .map((script) => `'${shaVersion}-${createHash(shaVersion).update(script).digest('base64')}'`)
    .join(' ');

  const configTemplate = readFileSync(join(projectRoot, '.github/default.conf'), 'utf8');
  // This is intentionally not the same directory as the docs output
  const configTarget = join(`${pkg.outDir}-nginx`, 'default.conf');
  mkdirSync(dirname(configTarget), { recursive: true });
  writeFileSync(
    configTarget,
    configTemplate.replace(`script-src 'self';`, `script-src 'self' ${scriptHash};`),
    'utf8',
  );

  console.log(`=> Built nginx config in ${relative(projectRoot, pkg.outDir)}`);
}

async function buildSizeStats(pkg: PackageBuilder): Promise<void> {
  const stats = {
    jsSize: 0,
    jsBrotliSize: 0,
    jsGzipSize: 0,
    jsCssSize: 0,
    cssSize: 0,
    cssBrotliSize: 0,
    cssGzipSize: 0,
    cssFiles: {} as Record<string, { size: number; gzipSize: number; brotliSize: number }>,
    jsFiles: {} as Record<
      string,
      { size: number; cssSize?: number; gzipSize: number; brotliSize: number }
    >,
  };
  for (const dir of ['elements', 'elements-experimental'].map((d) => join(distDirectory, d))) {
    for (const file of globSync('**/*.css', { cwd: dir })
      .map((f) => join(dir, f))
      .sort()) {
      const key = file.substring(distDirectory.length);
      const content = readFileSync(file, 'utf8');
      const size = content.length;
      const brotliSize = await calculateBrotliSize(content);
      const gzipSize = await calculateGzipSize(content);
      stats.cssSize += size;
      stats.cssBrotliSize += brotliSize;
      stats.cssGzipSize += gzipSize;
      stats.cssFiles[key] = { size, brotliSize, gzipSize };
    }
    for (const file of globSync('**/*.js', { cwd: dir })
      .filter((f) => !f.startsWith('development/'))
      .map((f) => join(dir, f))
      .sort()) {
      const key = file.substring(distDirectory.length);
      const content = readFileSync(file, 'utf8');
      const size = content.length;
      const brotliSize = await calculateBrotliSize(content);
      const gzipSize = await calculateGzipSize(content);
      stats.jsSize += size;
      stats.jsBrotliSize += brotliSize;
      stats.jsGzipSize += gzipSize;
      stats.jsFiles[key] = { size, brotliSize, gzipSize };
      const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ES2022, true);

      let cssTaggedName = '';
      let cssSize = 0;
      for (const node of iterate(sourceFile)) {
        if (
          ts.isImportDeclaration(node) &&
          node.moduleSpecifier.getText().slice(1, -1) === 'lit' &&
          node.importClause?.namedBindings &&
          ts.isNamedImports(node.importClause.namedBindings) &&
          node.importClause.namedBindings.elements.length
        ) {
          cssTaggedName =
            node.importClause.namedBindings.elements.find((e) => e.propertyName?.text === 'css')
              ?.name?.text ?? '';
        } else if (
          cssTaggedName &&
          ts.isTaggedTemplateExpression(node) &&
          node.tag.getText() === cssTaggedName
        ) {
          cssSize += node.template.getText().length;
        }
      }

      if (cssSize) {
        stats.jsCssSize += cssSize;
        stats.jsFiles[key].cssSize = cssSize;
      }
    }
  }

  writeFileSync(join(pkg.outDir, 'lyne-stats.json'), JSON.stringify(stats, null, 2), 'utf8');

  console.log(`=> Built size stats in ${relative(projectRoot, pkg.outDir)}`);
}
