/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

declare module '*?lit&inline' {
  const src: import('lit').CSSResultGroup;
  export default src;
}
