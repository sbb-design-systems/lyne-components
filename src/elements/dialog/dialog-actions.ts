/** @entrypoint */
import { SbbDialogActionsElement } from './dialog-actions/dialog-actions.component.ts';

export * from './dialog-actions/dialog-actions.component.ts';

SbbDialogActionsElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/dialog/dialog-actions.js' has been deprecated.
Use either '@sbb-esta/elements/dialog.js' or '@sbb-esta/elements/dialog.pure.js' instead.`);
