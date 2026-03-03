/** @entrypoint */
import { SbbToggleElement } from './toggle/toggle.component.ts';

export * from './toggle/toggle.component.ts';

SbbToggleElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/toggle/toggle.js' has been deprecated.
Use either '@sbb-esta/elements/toggle.js' or '@sbb-esta/elements/toggle.pure.js' instead.`);
