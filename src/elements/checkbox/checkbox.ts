/** @entrypoint */
import { SbbCheckboxElement } from './checkbox.component.ts';

export * from './checkbox.component.ts';

SbbCheckboxElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/checkbox/checkbox.js' has been deprecated.
Use either '@sbb-esta/elements/checkbox.js' or '@sbb-esta/elements/checkbox.pure.js' instead.`);
