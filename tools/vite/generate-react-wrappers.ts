/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import type { CustomElementDeclaration, Export, Module, Package } from 'custom-elements-manifest';
import type { PluginOption } from 'vite';

import { distDir } from './build-meta.ts';

const entrypointMarker = `/**
 * @entrypoint
 */
`;

export function generateReactWrappers(
  library: string,
  manifestPath: string,
  isMainLibrary = true,
): PluginOption {
  const fullManifestPath = new URL(manifestPath, distDir);
  let manifest: Package;
  try {
    manifest = JSON.parse(readFileSync(fullManifestPath, 'utf8'));
  } catch {
    console.error(
      `Failed to read manifest at ${fullManifestPath}. Please run 'yarn build:elements' or 'yarn docs:manifest' first!`,
    );
    process.exit(1);
  }

  const generatedPaths: URL[] = [];
  function createDir(dir: URL): void {
    if (!existsSync(dir)) {
      createDir(new URL('..', dir));
      generatedPaths.push(dir);
      mkdirSync(dir);
    }
  }
  return {
    name: 'generate-react-wrappers',
    config(config) {
      const packageRoot = pathToFileURL(config.root!);
      const exports = manifest.modules.reduce(
        (current, next) => current.concat(next.exports ?? []),
        [] as Export[],
      );
      const entryPoints: Record<string, string> = isMainLibrary ? { core: 'core.ts' } : {};
      for (const module of manifest.modules.filter((m) => !m.path.startsWith('core/'))) {
        for (const declaration of module.declarations?.filter(
          (d): d is CustomElementDeclaration => 'customElement' in d && d.customElement,
        ) ?? []) {
          const entryPoint = module.path.replace(/.js$/, '.ts');
          entryPoints[entryPoint.replace(/.ts$/, '')] = entryPoint;
          const targetPath = new URL(`./${entryPoint}`, packageRoot);
          createDir(new URL('.', targetPath));
          const reactTemplate = renderTemplate(
            declaration,
            module,
            exports,
            library,
            isMainLibrary,
          );
          generatedPaths.push(targetPath);
          writeFileSync(targetPath, reactTemplate, 'utf8');
        }
      }

      for (const dirent of readdirSync(packageRoot, {
        withFileTypes: true,
        recursive: true,
      }).filter((d) => d.isDirectory())) {
        const dir = join(dirent.parentPath, dirent.name);
        const relativeDir = relative(fileURLToPath(packageRoot), dir);
        const entryPoint = `${relativeDir}.ts`;
        entryPoints[relativeDir] = entryPoint;
        const dirEntryPoint = new URL(`./${entryPoint}`, packageRoot);

        if (!existsSync(dirEntryPoint)) {
          generatedPaths.push(dirEntryPoint);
          const directories = readdirSync(dir, { withFileTypes: true }).filter((d) =>
            d.isDirectory(),
          );
          const files = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile());
          const content =
            entrypointMarker +
            (directories.length ? directories : files)
              .map((d) => `export * from './${dirent.name}/${d.name.replace(/\.ts$/, '')}.js';\n`)
              .join('');
          writeFileSync(dirEntryPoint, content, 'utf8');
        }
      }

      config.build!.lib = {
        ...(config.build!.lib ? config.build!.lib : {}),
        entry: entryPoints,
      };
    },
    closeBundle() {
      for (const path of generatedPaths.sort((a, b) => b.pathname.length - a.pathname.length)) {
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
  isMainLibrary: boolean,
): string {
  const dirDepth = module.path.split('/').length - 1;
  const coreImportPath = isMainLibrary
    ? `${!dirDepth ? './' : '../'.repeat(dirDepth)}core.js`
    : `@sbb-esta/lyne-react/core.js`;
  const importPath = module.path.substring(0, module.path.lastIndexOf('/')) + '.js';
  const componentsImports = new Map<string, string[]>().set(importPath, [declaration.name]);

  if (declaration.events?.some((e) => !e.type)) {
    console.error(`(Inherited) events need jsdocs on class level! (${declaration.name})`);
  }

  let eventsImport: string[] = [];
  if (declaration.events) {
    const eventNames = declaration.events.map((e) => e.type.text);
    // Generic <T> types are filtered out from imports
    const customEventTypes =
      eventNames
        .filter(
          (name) =>
            name.startsWith('CustomEvent<') &&
            ['void', '{', 'File', 'T'].every((m) => !name.includes(`<${m}`)),
        )
        .map((name) => name.substring(12).slice(0, -1)) ?? [];

    // Events which extend Event must be added manually
    const customEvents = eventNames.filter((name) => name === 'SbbMonthChangeEvent') ?? [];
    eventsImport = [...customEventTypes, ...customEvents]
      .sort()
      .filter((v, i, a) => a.indexOf(v) === i && v.length > 1);
  }

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

  for (const customEventType of eventsImport) {
    const exportModule = exports.find((e) => e.name === customEventType);
    if (exportModule) {
      if (!componentsImports.has(exportModule.declaration.module!)) {
        componentsImports.set(exportModule.declaration.module!, [`type ${customEventType}`]);
      } else {
        componentsImports.get(exportModule.declaration.module!)!.push(`type ${customEventType}`);
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
  .map(([key, imports]) => `import { ${imports.join(', ')} } from '${library}/${key}';`)
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
