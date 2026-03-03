/** @entrypoint */
export * from './common/file-selector-common.ts';

export { default as fileSelectorCommonStyle } from './common/file-selector-common.scss?lit&inline';

console.warn(`The entrypoint '@sbb-esta/elements/file-selector/common.js' has been deprecated.
Use either '@sbb-esta/elements/file-selector.js' or '@sbb-esta/elements/file-selector.pure.js' instead.`);
