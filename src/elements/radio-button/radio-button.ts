/** @entrypoint */
import { SbbRadioButtonElement } from './radio-button/radio-button.component.ts';

export * from './radio-button/radio-button.component.ts';

SbbRadioButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/radio-button/radio-button.js' has been deprecated.
Use either '@sbb-esta/elements/radio-button.js' or '@sbb-esta/elements/radio-button.pure.js' instead.`);
