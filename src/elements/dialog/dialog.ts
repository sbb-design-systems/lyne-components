/** @entrypoint */
import { SbbDialogElement } from './dialog/dialog.component.ts';

export * from './dialog/dialog.component.ts';

SbbDialogElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/dialog/dialog.js' has been deprecated.
Use either '@sbb-esta/elements/dialog.js' or '@sbb-esta/elements/dialog.pure.js' instead.`);
