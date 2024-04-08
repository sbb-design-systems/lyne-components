import type { ConfigEnv } from 'vite';

export const root = new URL('../..', import.meta.url);
export const distDir = new URL('./dist/', root);

export const isProdBuild = ({ command, mode }: ConfigEnv): boolean =>
  command === 'build' && mode !== 'development';
