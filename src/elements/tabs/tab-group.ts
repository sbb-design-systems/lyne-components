/** @entrypoint */
import { SbbTabGroupElement } from './tab-group/tab-group.component.ts';

export * from './tab-group/tab-group.component.ts';

SbbTabGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/tabs/tab-group.js' has been deprecated.
Use either '@sbb-esta/elements/tabs.js' or '@sbb-esta/elements/tabs.pure.js' instead.`);
