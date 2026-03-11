/** @entrypoint */
import { SbbDialogTitleElement } from './dialog-title/dialog-title.component.ts';

export * from './dialog-title/dialog-title.component.ts';

SbbDialogTitleElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/dialog/dialog-title.js' has been deprecated.
Use either '@sbb-esta/elements/dialog.js' or '@sbb-esta/elements/dialog.pure.js' instead.`);
