/** @entrypoint */
import { SbbOptionElement } from './option/option.component.ts';

export * from './option/option.component.ts';
export * from './option/option-base-element.ts';

SbbOptionElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/option/option.js' has been deprecated.
Use either '@sbb-esta/elements/option.js' or '@sbb-esta/elements/option.pure.js' instead.`);
