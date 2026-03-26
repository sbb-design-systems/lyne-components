/** @entrypoint */
import { SbbAccentButtonElement } from '../button.pure.ts';

export * from './accent-button/accent-button.component.ts';

SbbAccentButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/accent-button.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
