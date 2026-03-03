/** @entrypoint */
import { SbbTimetableFormDetailsElement } from './timetable-form-details/timetable-form-details.component.ts';

export * from './timetable-form-details/timetable-form-details.component.ts';

SbbTimetableFormDetailsElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/timetable-form/timetable-form-details.js' has been deprecated.
Use either '@sbb-esta/elements/timetable-form.js' or '@sbb-esta/elements/timetable-form.pure.js' instead.`);
