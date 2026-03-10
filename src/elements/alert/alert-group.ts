/** @entrypoint */
import { SbbAlertGroupElement } from './alert-group/alert-group.component.ts';

export * from './alert-group/alert-group.component.ts';

SbbAlertGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/alert/alert-group.js' has been deprecated.
Use either '@sbb-esta/elements/alert.js' or '@sbb-esta/elements/alert.pure.js' instead.`);
