import { globSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import * as ts from 'typescript';
import type { PluginOption, ResolvedConfig } from 'vite';

import { globExcludeInternals } from './build-meta.ts';

export function generateRootEntryPoint(): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'package-json-templating',
    configResolved(config) {
      viteConfig = config;
    },
    async generateBundle() {
      if (viteConfig.command !== 'build') {
        return;
      }
      const customElementMap = new Map<string, string[]>();
      for (const dirent of globSync('**/*.ts', {
        cwd: viteConfig.root,
        withFileTypes: true,
        exclude: globExcludeInternals,
      })) {
        const file = join(dirent.parentPath, dirent.name);
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
          customElementMap.set(
            `./${relative(viteConfig.root, file).replace(/\.ts$/, '.js')}`,
            customElements,
          );
        }
      }

      const imports = Array.from(customElementMap)
        .map(([path, symbols]) => `import { ${symbols.join(', ')} } from "${path}";\n`)
        .join('');
      const classSymbols = Array.from(customElementMap.values()).flat().sort();
      const globalAssignment = classSymbols.map((s) => `globalThis.${s} = ${s};\n`).join('');
      const typings = classSymbols.map((s) => `  var ${s}: ${s};\n`).join('');
      this.emitFile({
        type: 'asset',
        fileName: 'index.js',
        source: `${imports}\n${globalAssignment}\nexport {}\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'index.d.ts',
        source: `${imports}\ndeclare global {\n${typings}}\n\nexport {}\n`,
      });
    },
  };
}
