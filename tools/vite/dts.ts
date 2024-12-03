import type { Plugin } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export function dts(): Plugin {
  return dtsPlugin({
    entryRoot: '.',
    exclude: ['**/*[.-]{stories,spec,test-utils}.ts', '**/private/*', 'vite.config.ts'],
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
      } else {
        return undefined;
      }
    },
  });
}
