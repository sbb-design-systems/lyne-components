/** @entrypoint */
import { SbbCheckboxPanelElement } from '../checkbox-panel/checkbox-panel.component.ts';

export * from '../checkbox-panel/checkbox-panel.component.ts';

SbbCheckboxPanelElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/checkbox/checkbox-panel.js' has been deprecated.
Use either '@sbb-esta/elements/checkbox.js' or '@sbb-esta/elements/checkbox.pure.js' instead.`);
