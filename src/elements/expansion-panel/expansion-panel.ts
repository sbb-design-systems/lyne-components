/** @entrypoint */
import { SbbExpansionPanelElement } from './expansion-panel/expansion-panel.component.ts';

export * from './expansion-panel/expansion-panel.component.ts';

SbbExpansionPanelElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/expansion-panel/expansion-panel.js' has been deprecated.
Use either '@sbb-esta/elements/expansion-panel.js' or '@sbb-esta/elements/expansion-panel.pure.js' instead.`);
