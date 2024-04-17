/// <reference types="vite/client" />

declare module 'virtual:screenshots' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  export const screenshots: Record<string, import('../vite.config.ts').FailedFiles[]>;
}
