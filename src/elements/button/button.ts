/** @entrypoint */
import { SbbButtonElement } from '../button.pure.ts';

export * from './button/button.component.ts';

SbbButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/button.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
