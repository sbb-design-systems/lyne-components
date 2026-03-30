/** @entrypoint */
import { SbbSecondaryButtonLinkElement } from '../button.pure.ts';

export * from './secondary-button-link/secondary-button-link.component.ts';

SbbSecondaryButtonLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/secondary-button-link.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
