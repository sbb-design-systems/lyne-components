/** @entrypoint */
import { SbbErrorElement } from './error/error.component.ts';

export * from './error/error.component.ts';

SbbErrorElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/form-field/error.js' has been deprecated.
Use either '@sbb-esta/elements/form-field.js' or '@sbb-esta/elements/form-field.pure.js' instead.`);
