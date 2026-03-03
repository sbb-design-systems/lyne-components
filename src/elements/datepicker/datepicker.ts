/** @entrypoint */
import { SbbDatepickerElement } from './datepicker/datepicker.component.ts';

export * from './datepicker/datepicker.component.ts';

SbbDatepickerElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/datepicker/datepicker.js' has been deprecated.
Use either '@sbb-esta/elements/datepicker.js' or '@sbb-esta/elements/datepicker.pure.js' instead.`);
