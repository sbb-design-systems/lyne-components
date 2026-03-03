/** @entrypoint */
import { SbbDialogContentElement } from './dialog-content/dialog-content.component.ts';

export * from './dialog-content/dialog-content.component.ts';

SbbDialogContentElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/dialog/dialog-content.js' has been deprecated.
Use either '@sbb-esta/elements/dialog.js' or '@sbb-esta/elements/dialog.pure.js' instead.`);
