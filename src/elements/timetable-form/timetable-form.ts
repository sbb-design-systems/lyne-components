/** @entrypoint */
import { SbbTimetableFormElement } from './timetable-form/timetable-form.component.ts';

export * from './timetable-form/timetable-form.component.ts';

SbbTimetableFormElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/timetable-form/timetable-form.js' has been deprecated.
Use either '@sbb-esta/elements/timetable-form.js' or '@sbb-esta/elements/timetable-form.pure.js' instead.`);
