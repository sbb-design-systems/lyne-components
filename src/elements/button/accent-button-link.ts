/** @entrypoint */
import { SbbAccentButtonLinkElement } from '../button.pure.ts';

export * from './accent-button-link/accent-button-link.component.ts';

SbbAccentButtonLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/accent-button-link.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
