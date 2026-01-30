/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module 'virtual:screenshots' {
  export const screenshotsRaw: import('./src/interfaces.ts').ScreenshotMap;
}

declare module 'virtual:meta' {
  export const meta: import('./src/interfaces.ts').Meta;
}
