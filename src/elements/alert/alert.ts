/** @entrypoint */
import { SbbAlertElement } from './alert/alert.component.ts';

export * from './alert/alert.component.ts';

SbbAlertElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/alert/alert.js' has been deprecated.
Use either '@sbb-esta/elements/alert.js' or '@sbb-esta/elements/alert.pure.js' instead.`);
