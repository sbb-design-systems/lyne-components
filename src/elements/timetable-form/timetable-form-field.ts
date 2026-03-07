/** @entrypoint */
import { SbbTimetableFormFieldElement } from './timetable-form-field/timetable-form-field.component.ts';

export * from './timetable-form-field/timetable-form-field.component.ts';

SbbTimetableFormFieldElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/timetable-form/timetable-form-field.js' has been deprecated.
Use either '@sbb-esta/elements/timetable-form.js' or '@sbb-esta/elements/timetable-form.pure.js' instead.`);
