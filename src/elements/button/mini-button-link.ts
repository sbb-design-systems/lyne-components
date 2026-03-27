/** @entrypoint */
import { SbbMiniButtonLinkElement } from '../button.pure.ts';

export * from './mini-button-link/mini-button-link.component.ts';

SbbMiniButtonLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/mini-button-link.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
