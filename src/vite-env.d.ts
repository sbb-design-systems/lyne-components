/// <reference types="vite/client" />

declare module '*?lit&inline' {
  const src: import('lit').CSSResult;
  export default src;
}
