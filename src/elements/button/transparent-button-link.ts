/** @entrypoint */
import { SbbTransparentButtonLinkElement } from '../button.pure.ts';

export * from './transparent-button-link/transparent-button-link.component.ts';

SbbTransparentButtonLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/transparent-button-link.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
