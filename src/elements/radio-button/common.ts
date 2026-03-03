/** @entrypoint */
export * from './common/radio-button-common.ts';

export { default as radioButtonCommonStyle } from './common/radio-button-common.scss?lit&inline';

console.warn(`The entrypoint '@sbb-esta/elements/radio-button/common.js' has been deprecated.
Use either '@sbb-esta/elements/radio-button.js' or '@sbb-esta/elements/radio-button.pure.js' instead.`);
