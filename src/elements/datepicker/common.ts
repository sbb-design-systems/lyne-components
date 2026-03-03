/** @entrypoint */
export * from './common/datepicker-button.ts';

export { default as datepickerButtonStyle } from './common/datepicker-button.scss?lit&inline';

console.warn(`The entrypoint '@sbb-esta/elements/datepicker/common.js' has been deprecated.
Use either '@sbb-esta/elements/datepicker.js' or '@sbb-esta/elements/datepicker.pure.js' instead.`);
