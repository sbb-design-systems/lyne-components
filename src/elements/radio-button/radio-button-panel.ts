/** @entrypoint */
import { SbbRadioButtonPanelElement } from './radio-button-panel/radio-button-panel.component.ts';

export * from './radio-button-panel/radio-button-panel.component.ts';

SbbRadioButtonPanelElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/radio-button/radio-button-panel.js' has been deprecated.
Use either '@sbb-esta/elements/radio-button.js' or '@sbb-esta/elements/radio-button.pure.js' instead.`);
