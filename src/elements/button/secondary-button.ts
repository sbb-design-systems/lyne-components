/** @entrypoint */
import { SbbSecondaryButtonElement } from '../button.pure.ts';

export * from './secondary-button/secondary-button.component.ts';

SbbSecondaryButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/secondary-button.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
