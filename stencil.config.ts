import { inlineSvg } from 'stencil-inline-svg';
import { sass } from '@stencil/sass';
import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { basename, dirname, join, resolve } from 'path';
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import * as ts from 'typescript';

export const config: Config = {
  globalStyle: 'src/global/styles/global.scss',
  namespace: 'lyne-components',
  outputTargets: [
    {
      type: 'dist-hydrate-script',
    },
    {
      esmLoaderPath: '../loader',
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      footer: '',
      type: 'docs-readme',
    },
    {
      dir: './dist/documentation',
      footer: '',
      type: 'docs-readme',
    },
    {
      file: './dist/documentation/jsonDocs.json',
      type: 'docs-json',
    },
    react({
      componentCorePackage: '@sbb-esta/lyne-components',
      proxiesFile: './react-library/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
  ],
  plugins: [inlineSvg(), sass()],
  rollupPlugins: {
    // eslint-disable-next-line
    before: [eventSync()],
  },
  testing: {
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageThreshold: {
      global: {
        // Example: setting functions threshold to 50, and after test we reach
        // 30, the build will break
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    modulePaths: ['src', '/node_modules/'],
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/jestAssetsTransformer.js',
    },
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$': '@stencil/core/testing/jest-preprocessor',
    },
    setupFilesAfterEnv: ['<rootDir>/src/global/testing/jest-setup.ts'],
  },
};

/* eslint-disable */
interface InputOptions {
  input: string[] | { [entryAlias: string]: string };
}

/**
 * Event sync rollup hook implementation.
 * For each build cycle, all component files are checked for @Event({...})
 * usages and the property name and event name will be synced in the
 * corresponding .events.ts file. *
 */
function eventSync(): any {
  const componentsPath = resolve(__dirname, 'src/components');
  return {
    buildStart(options: InputOptions): void {
      if (
        typeof options.input !== 'object' ||
        Object.keys(options.input).every((i) => !i.startsWith('sbb'))
      ) {
        return;
      }

      readdirSync(componentsPath, {
        withFileTypes: true,
      })
        .filter((d) => d.isDirectory())
        .map((d) => join(componentsPath, d.name, `${d.name}.tsx`))
        .forEach(syncEvents);
    },
    name: 'event-sync',
  };
}

/** Sync events for a specific component. */
function syncEvents(path: string) {
  let fileContent: string;
  try {
    fileContent = readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(`Unable to find file ${path} for event sync!`);
  }
  const sourceFile = ts.createSourceFile(path, fileContent, ts.ScriptTarget.ESNext, true);
  const eventDecorators: { name: string; eventName: string }[] = [];
  let usesCustomEvent = false;
  iterateSourceFile(sourceFile);
  renderEventsFile();

  function iterateSourceFile(node: ts.Node) {
    if (ts.isPropertyDeclaration(node) && ts.getDecorators(node)?.length) {
      checkForEventDecorator(node);
    } else if (ts.isNewExpression(node) && node.expression.getText() === 'CustomEvent') {
      usesCustomEvent = true;
    } else {
      ts.forEachChild(node, iterateSourceFile);
    }
  }

  function checkForEventDecorator(node: ts.PropertyDeclaration) {
    const eventDecorator = ts.getDecorators(node)!.find(isEventDecorator);
    if (!eventDecorator) {
      return;
    }

    const name = node.name.getText();
    const eventName = findEventName(eventDecorator) ?? name;
    eventDecorators.push({ name, eventName });
  }

  function isEventDecorator(decorator: ts.Decorator) {
    const callExpression = decorator.expression;
    return ts.isCallExpression(callExpression) && callExpression.expression.getText() === 'Event';
  }

  function findEventName(decorator: ts.Decorator) {
    const callExpression = decorator.expression as ts.CallExpression;
    const argument = callExpression.arguments[0];
    if (callExpression.arguments.length !== 1 || !ts.isObjectLiteralExpression(argument)) {
      return null;
    }
    const eventName = argument.properties.find((p) => p.name?.getText() === 'eventName');
    if (!eventName || !ts.isPropertyAssignment(eventName)) {
      return null;
    }

    const initializer = eventName.initializer;
    return ts.isStringLiteral(initializer) ? initializer.text : null;
  }

  function renderEventsFile() {
    const eventsFile = join(dirname(path), basename(path).replace('.tsx', '.events.ts'));
    if (usesCustomEvent) {
      return;
    } else if (!eventDecorators.length) {
      deleteEventsFile(eventsFile);
      return;
    }

    let output = `/**
 * This file is autogenerated by the event-sync plugin.
 * See stencil.config.ts in the root directory.
 */
export default {\n`;
    for (const eventDecorator of eventDecorators.sort((a, b) => a.name.localeCompare(b.name))) {
      output += `  ${eventDecorator.name}: '${eventDecorator.eventName}',\n`;
    }

    output += '};\n';

    if (readFileSync(eventsFile, 'utf8') !== output) {
      writeFileSync(eventsFile, output, 'utf8');
    }
  }

  function deleteEventsFile(path: string) {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  }
}
