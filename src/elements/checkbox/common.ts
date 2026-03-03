/** @entrypoint */
export * from './common/checkbox-common.ts';

export { default as checkboxCommonStyle } from './common/checkbox-common.scss?lit&inline';

console.warn(`The entrypoint '@sbb-esta/elements/checkbox/common.js' has been deprecated.
Use either '@sbb-esta/elements/checkbox.js' or '@sbb-esta/elements/checkbox.pure.js' instead.`);
