/** @entrypoint */
import { SbbTabLabelElement } from './tab-label/tab-label.component.ts';

export * from './tab-label/tab-label.component.ts';

SbbTabLabelElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/tabs/tab-label.js' has been deprecated.
Use either '@sbb-esta/elements/tabs.js' or '@sbb-esta/elements/tabs.pure.js' instead.`);
