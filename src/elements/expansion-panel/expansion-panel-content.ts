/** @entrypoint */
import { SbbExpansionPanelContentElement } from './expansion-panel-content/expansion-panel-content.component.ts';

export * from './expansion-panel-content/expansion-panel-content.component.ts';

SbbExpansionPanelContentElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/expansion-panel/expansion-panel-content.js' has been deprecated.
Use either '@sbb-esta/elements/expansion-panel.js' or '@sbb-esta/elements/expansion-panel.pure.js' instead.`);
