/* eslint-disable  @typescript-eslint/consistent-type-imports */
/// <reference types="vite/client" />

declare module '*?lit&inline' {
  const src: import('lit').CSSResultGroup;
  export default src;
}
