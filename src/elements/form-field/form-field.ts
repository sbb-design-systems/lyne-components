/** @entrypoint */
import { SbbFormFieldElement } from './form-field/form-field.component.ts';

export * from './form-field/form-field.component.ts';

SbbFormFieldElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/form-field/form-field.js' has been deprecated.
Use either '@sbb-esta/elements/form-field.js' or '@sbb-esta/elements/form-field.pure.js' instead.`);
