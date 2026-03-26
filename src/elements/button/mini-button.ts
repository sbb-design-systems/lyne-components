/** @entrypoint */
import { SbbMiniButtonElement } from '../button.pure.ts';

export * from './mini-button/mini-button.component.ts';

SbbMiniButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/mini-button.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
