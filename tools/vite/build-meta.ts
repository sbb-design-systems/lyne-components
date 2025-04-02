import type { Dirent } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ConfigEnv } from 'vite';

export const root = new URL('../..', import.meta.url);
const rootAsString = fileURLToPath(root);
export const distDir = new URL('./dist/', root);
const internalFileNames = ['vite.config.ts', 'private.ts'];
const internalFileEndings = ['spec', 'stories', 'private'].map((e) => `.${e}.ts`);
export const globExcludeInternals = (dirent: Dirent): boolean =>
  internalFileNames.some((e) => dirent.name === e) ||
  internalFileEndings.some((e) => dirent.name.endsWith(e)) ||
  relative(rootAsString, join(dirent.parentPath, dirent.name)).includes('/private/');

export const isProdBuild = ({ command, mode }: ConfigEnv): boolean =>
  command === 'build' && mode !== 'development';
