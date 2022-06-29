// Polyfill for :focus-visible
import 'focus-visible/dist/focus-visible.min';

/*
 * Define component mode
 *
 * Pick component CSS file based on globally (<html> element) defined mode
 * (default|shared) where default is encapsulated/selfcontaining. Inspired by
 * Ionic framework @see link below. Could at one point also be used to test out
 * new designs with a `next` mode.
 */

// eslint-disable-next-line max-len
// @see https://github.com/ionic-team/ionic-framework/blob/main/core/src/global/ionic-global.ts

import { Mode } from '../interface';
import { setMode } from '@stencil/core';

let defaultMode: Mode;

// eslint-disable-next-line max-len
// export const getLyneMode = (ref?: any): Mode => (ref && getMode(ref)) || defaultMode;

export const initialize = (): Mode => {
  if (typeof (window as any) === 'undefined') {
    return;
  }

  const doc = window.document;

  /*
   * We see if the mode was set as an attribute on <html>
   * which could have been set by the user, or by pre-rendering
   */
  defaultMode = doc.documentElement.getAttribute('mode') === 'shared' ? 'shared' : 'default';

  const isSbbElement = (elm: HTMLElement): boolean => elm.tagName && elm.tagName.startsWith('sbb-');

  const isAllowedSbbModeValue = (elmMode: string): boolean =>
    ['default', 'shared'].includes(elmMode);

  setMode((elm: any) => {
    while (elm) {
      const elmMode = (elm as any).mode || elm.getAttribute('mode');

      if (elmMode) {
        if (isAllowedSbbModeValue(elmMode)) {
          return elmMode;
        } else if (isSbbElement(elm)) {
          console.warn(`Invalid SBB mode: "${elmMode}", expected: "default" or "shared"`);
        }
      }
      // eslint-disable-next-line no-param-reassign
      elm = elm.parentElement;
    }

    return defaultMode;
  });
};

export default initialize;
