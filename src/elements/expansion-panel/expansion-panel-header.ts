/** @entrypoint */
import { SbbExpansionPanelHeaderElement } from './expansion-panel-header/expansion-panel-header.component.ts';

export * from './expansion-panel-header/expansion-panel-header.component.ts';

SbbExpansionPanelHeaderElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/expansion-panel/expansion-panel-header.js' has been deprecated.
Use either '@sbb-esta/elements/expansion-panel.js' or '@sbb-esta/elements/expansion-panel.pure.js' instead.`);
