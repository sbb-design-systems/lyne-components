/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

declare module '*?lit&inline' {
  const src: import('lit').CSSResult;
  export default src;
}

declare namespace JSX {
  type Element = jsxDom.JSX.Element;
  interface IntrinsicElements {
    'sbb-icon': import('./components/sbb-icon/sbb-icon').SbbIcon & jsxDom.JSX.Element;
  }
}
