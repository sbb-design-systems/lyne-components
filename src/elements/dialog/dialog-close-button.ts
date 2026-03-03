/** @entrypoint */
import { SbbDialogCloseButtonElement } from './dialog-close-button/dialog-close-button.component.ts';

export * from './dialog-close-button/dialog-close-button.component.ts';

SbbDialogCloseButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/dialog/dialog-close-button.js' has been deprecated.
Use either '@sbb-esta/elements/dialog.js' or '@sbb-esta/elements/dialog.pure.js' instead.`);
