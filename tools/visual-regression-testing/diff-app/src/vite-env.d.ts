/// <reference types="vite/client" />

declare module 'virtual:screenshots' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  export const screenshotsRaw: import('../interfaces.js').ScreenshotMap;
}

declare module '*?lit&inline' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const src: import('lit').CSSResultGroup;
  export default src;
}
