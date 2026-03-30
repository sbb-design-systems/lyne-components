/** @entrypoint */
import { SbbButtonLinkElement } from '../button.pure.ts';

export * from './button-link/button-link.component.ts';

SbbButtonLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/button-link.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
