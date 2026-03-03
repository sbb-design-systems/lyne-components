/** @entrypoint */
import { SbbToggleOptionElement } from './toggle-option/toggle-option.component.ts';

export * from './toggle-option/toggle-option.component.ts';

SbbToggleOptionElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/toggle/toggle-option.js' has been deprecated.
Use either '@sbb-esta/elements/toggle.js' or '@sbb-esta/elements/toggle.pure.js' instead.`);
