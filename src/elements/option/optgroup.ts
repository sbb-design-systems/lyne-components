/** @entrypoint */
import { SbbOptGroupElement } from './optgroup/optgroup.component.ts';

export * from './optgroup/optgroup.component.ts';
export * from './optgroup/optgroup-base-element.ts';

SbbOptGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/option/optgroup.js' has been deprecated.
Use either '@sbb-esta/elements/option.js' or '@sbb-esta/elements/option.pure.js' instead.`);
