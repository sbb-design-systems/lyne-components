import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

import {
  type AbsolutePath,
  createPackageAnalyzer,
  type LitElementDeclaration,
  type Module,
} from '@lit-labs/analyzer/package-analyzer.js';
import { format, resolveConfig } from 'prettier';

const types = new Set<string | undefined>();

class AngularWrapperGenerator {
  public readonly startMarker = '/* auto-generated lit -- DO NOT EDIT */';
  public readonly endMarker = '/* /auto-generated lit */';
  public readonly packagePath = fileURLToPath(this.packageURL) as AbsolutePath;
  public readonly outputPath = fileURLToPath(this.outputURL) as AbsolutePath;
  public readonly analyzer = createPackageAnalyzer(this.packagePath, {
    exclude: [
      '**/*.stories.ts',
      '**/*.spec.ts',
      '**/*-test-utils.ts',
      '**/private/*',
      '**/private.ts',
      '**/core/base-elements/*.ts',
      '**/vite.config.ts',
      '**/vite-env.d.ts',
      '../vite-env.d.ts',
    ],
  });
  public readonly package = this.analyzer.getPackage();
  public readonly packageName = this.package.name.replace('elements', 'angular');

  public constructor(
    public readonly packageURL: URL,
    public readonly outputURL: URL,
  ) {}

  public async generate(): Promise<void> {
    for (const litModule of this.package
      .getLitElementModules()
      .filter((m) => m.declarations.length && !!m.declarations[0].tagname)) {
      const targetPath = join(this.outputPath, litModule.module.sourcePath);
      const targetDir = dirname(targetPath);
      let currentContent = '';
      let newContent = '';
      if (existsSync(targetPath)) {
        currentContent = readFileSync(targetPath, 'utf8');
        if (
          !currentContent.includes(this.startMarker) ||
          !currentContent.includes(this.endMarker)
        ) {
          throw new Error(`${targetPath} is missing start or end marker!`);
        }

        newContent =
          currentContent.substring(0, currentContent.indexOf(this.startMarker)) +
          this._angularPropertiesTemplate(litModule.declarations[0]) +
          currentContent.substring(currentContent.indexOf(this.endMarker) + this.endMarker.length);
      } else {
        newContent = this._angularFileTemplate(litModule.module, litModule.declarations[0]);
      }

      const options = await resolveConfig(targetPath);
      newContent = await format(newContent, { ...options, filepath: targetPath });
      if (newContent !== currentContent) {
        mkdirSync(targetDir, { recursive: true });
        writeFileSync(targetPath, newContent, 'utf8');
      }
      if (!currentContent) {
        writeFileSync(
          join(targetDir, 'ng-package.json'),
          `{\n  "lib": {\n    "entryFile": "index.ts"\n  }\n}\n`,
          'utf8',
        );
        writeFileSync(
          join(targetDir, 'index.ts'),
          `export * from './${basename(targetPath).replace(/\.ts$/, '')}';\n`,
          'utf8',
        );
      }
    }
  }

  private _angularFileTemplate(module: Module, element: LitElementDeclaration): string {
    const { name, tagname, events, reactiveProperties } = element;
    const hasEvents = events.size > 0;
    const requiresNgZone = reactiveProperties.size > 0;
    const requiresEl = reactiveProperties.size > 0 || hasEvents;
    const angularImports = [
      'Directive',
      requiresEl ? 'ElementRef' : '',
      requiresEl || requiresNgZone ? 'inject' : '',
      reactiveProperties.size > 0 ? 'Input' : '',
      requiresNgZone ? 'NgZone' : '',
      hasEvents ? 'Output' : '',
    ]
      .sort()
      .filter(Boolean);
    let booleanInput = false;
    let numberInput = false;
    let stringInput = false;
    let anyInput = false;
    reactiveProperties.forEach((value) => {
      types.add(value.type?.text);
      if (value.type?.text === 'boolean') {
        booleanInput = true;
      } else if (value.type?.text === 'number') {
        numberInput = true;
      } else if (value.type?.text === 'string') {
        stringInput = true;
      } else {
        anyInput = true;
      }
    });
    const coreImports = [
      reactiveProperties.size > 0 ? 'isNonAttributeValue' : '',
      booleanInput ? 'litBooleanAttribute' : '',
      numberInput ? 'litNumberAttribute' : '',
      stringInput ? 'litStringAttribute' : '',
      anyInput ? 'litAttribute' : '',
    ]
      .sort()
      .filter(Boolean);
    return `import { ${angularImports.join(', ')} } from '@angular/core';
${coreImports.length ? `import { ${coreImports.join(', ')} } from '${this.packageName}/core';` : ''}
import type { ${name} } from '${this.package.name}/${module.jsPath}';
${hasEvents ? `import { fromEvent, type Observable } from 'rxjs';` : ''}

import '${this.package.name}/${module.jsPath}';

@Directive({
  selector: '${tagname}',
  standalone: true,
})
export class ${name.replace(/Element$/, '')} {
  ${this._angularPropertiesTemplate(element)}
}
`;
  }

  private _angularPropertiesTemplate(element: LitElementDeclaration): string {
    const { name, events, reactiveProperties } = element;
    const hasEvents = events.size > 0;
    const requiresNgZone = reactiveProperties.size > 0;
    const requiresEl = reactiveProperties.size > 0 || hasEvents;
    return `${this.startMarker}
  ${requiresEl ? `private _elementRef = inject(ElementRef<${name}>);` : ''}
  ${requiresNgZone ? `private _ngZone = inject(NgZone);` : ''}
${Array.from(reactiveProperties)
  .map(
    ([propertyName, property]) => `
  @Input(${this._resolveTransform(property.type?.text)})
  public set ${propertyName}(value: ${property.type?.text ?? 'any'}) {
    if (isNonAttributeValue(value)) {
      this._ngZone.runOutsideAngular(() => (this._elementRef.nativeElement.${propertyName} = value));
    }
  }
  public get ${propertyName}(): ${property.type?.text} {
    return this._elementRef.nativeElement.${propertyName};
  }

`,
  )
  .join('')}
    ${Array.from(events).map(
      ([eventName, event]) => `
  @Output(${this._eventToPropertyName(eventName) !== eventName ? `{ alias: '${eventName}' }` : ''})
  public ${this._eventToPropertyName(eventName)}Event: Observable<${event.type?.text ?? 'unknown'}> = fromEvent(this._elementRef.nativeElement, '${eventName}');
`,
    )}
  ${this.endMarker}`;
  }

  private _resolveTransform(type: string | undefined): string {
    switch (type) {
      case 'boolean':
        return '{ transform: litBooleanAttribute }';
      case 'number':
        return '{ transform: litNumberAttribute }';
      case 'string':
        return '{ transform: litStringAttribute }';
      default:
        return '{ transform: litAttribute }';
    }
  }

  private _eventToPropertyName(eventName: string): string {
    return eventName.replace(/-+([a-zA-Z])/g, (_, c) => c.toUpperCase());
  }
}

const [pkgName] = process.argv.slice(2);
console.log(`Generating Angular Wrapper for ${pkgName}`);

await new AngularWrapperGenerator(
  new URL(`../../src/${pkgName}/`, import.meta.url),
  new URL(`../../src/${pkgName.replace('elements', 'angular')}/`, import.meta.url),
).generate();
console.log([...types].sort());
