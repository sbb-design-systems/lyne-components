/** @entrypoint */
import { SbbDatepickerToggleElement } from './datepicker-toggle/datepicker-toggle.component.ts';

export * from './datepicker-toggle/datepicker-toggle.component.ts';

SbbDatepickerToggleElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/datepicker/datepicker-toggle.js' has been deprecated.
Use either '@sbb-esta/elements/datepicker.js' or '@sbb-esta/elements/datepicker.pure.js' instead.`);
