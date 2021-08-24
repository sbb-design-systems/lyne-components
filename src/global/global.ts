// Polyfill for :focus-visible
import 'focus-visible/dist/focus-visible.min';

// Define component mode
//
// Pick component CSS file based on globally (<html> element) defined mode (default|shared)
// @see https://github.com/ionic-team/ionic-framework/blob/main/core/src/global/ionic-global.ts

import { setMode } from '@stencil/core';

//import { Mode } from '../interface';
//let defaultMode: Mode;
let mode;

export const initialize = () => {
  if (typeof (window as any) === 'undefined') { return; }

  const doc = window.document;

  // We see if the mode was set as an attribute on <html>
  // which could have been set by the user, or by pre-rendering
  mode = doc.documentElement.getAttribute('mode') || 'default';

  const isLyneElement = (elm: any) =>
        elm.tagName && elm.tagName.startsWith('lyne-');

  const isAllowedLyneModeValue = (elmMode: string) =>
      ['default', 'shared'].includes(elmMode);

  setMode((elm: any) => {
    while (elm) {
      const elmMode = (elm as any).mode || elm.getAttribute('mode');
      if (elmMode) {
        if (isAllowedLyneModeValue(elmMode)) {
          return elmMode;
        } else if (isLyneElement(elm)) {
          console.warn('Invalid Lyne mode: "' + elmMode + '", expected: "default" or "shared"');
        }
      }
      elm = elm.parentElement;
    }
    return mode;
  });
};

export default initialize;
