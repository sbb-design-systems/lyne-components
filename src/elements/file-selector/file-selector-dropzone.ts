/** @entrypoint */
import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone/file-selector-dropzone.component.ts';

export * from './file-selector-dropzone/file-selector-dropzone.component.ts';

SbbFileSelectorDropzoneElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/file-selector/file-selector-dropzone.js' has been deprecated.
Use either '@sbb-esta/elements/file-selector.js' or '@sbb-esta/elements/file-selector.pure.js' instead.`);
