/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module '@custom-elements-manifest/analyzer/cli.js' {
  export const cli: (...args) => Promise<void>;
}

declare module '@custom-elements-manifest/to-markdown' {
  export const customElementsManifestToMarkdown: (...args) => string;
}

declare module '@custom-elements-manifest/analyzer/src/features/index.js' {
  export const FEATURES: import('@custom-elements-manifest/analyzer').Plugin[];
}

declare module '@custom-elements-manifest/analyzer/src/utils/manifest-helpers.js' {
  export function getAllDeclarationsOfKind<
    T extends import('custom-elements-manifest').Declaration,
  >(manifest: import('custom-elements-manifest').Package, kind: string): T[];

  export function getModuleForClassLike(
    manifests: import('custom-elements-manifest').Package[],
    className: string,
  ): string;

  export function getModuleFromManifests(
    manifests: import('custom-elements-manifest').Package[],
    modulePath: string,
  ): import('custom-elements-manifest').JavaScriptModule;

  export function getInheritanceTree(
    manifests: import('custom-elements-manifest').Package[],
    className: string,
  ): import('custom-elements-manifest').Declaration[];
}

declare module '@custom-elements-manifest/analyzer/src/utils/index.js' {
  export function resolveModuleOrPackageSpecifier(
    moduleDoc: import('custom-elements-manifest').JavaScriptModule,
    context: import('@custom-elements-manifest/analyzer').Context,
    name: string,
  ): { module: string } | { package: string };
}
