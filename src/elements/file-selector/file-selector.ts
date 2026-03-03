/** @entrypoint */
import { SbbFileSelectorElement } from './file-selector/file-selector.component.ts';

export * from './file-selector/file-selector.component.ts';

SbbFileSelectorElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/file-selector/file-selector.js' has been deprecated.
Use either '@sbb-esta/elements/file-selector.js' or '@sbb-esta/elements/file-selector.pure.js' instead.`);
