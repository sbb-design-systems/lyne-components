/** @entrypoint */
import { SbbTransparentButtonElement } from '../button.pure.ts';

export * from './transparent-button/transparent-button.component.ts';

SbbTransparentButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/transparent-button.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
