/** @entrypoint */
import { SbbRadioButtonGroupElement } from '../radio-button-group/radio-button-group.component.ts';

export * from '../radio-button-group/radio-button-group.component.ts';

SbbRadioButtonGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/radio-button/radio-button-group.js' has been deprecated.
Use either '@sbb-esta/elements/radio-button.js' or '@sbb-esta/elements/radio-button.pure.js' instead.`);
