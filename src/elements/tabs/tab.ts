/** @entrypoint */
import { SbbTabElement } from './tab/tab.component.ts';

export * from './tab/tab.component.ts';

SbbTabElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/tabs/tab.js' has been deprecated.
Use either '@sbb-esta/elements/tabs.js' or '@sbb-esta/elements/tabs.pure.js' instead.`);
