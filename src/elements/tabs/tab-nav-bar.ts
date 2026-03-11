/** @entrypoint */
import { SbbTabNavBarElement } from './tab-nav-bar/tab-nav-bar.component.ts';

export * from './tab-nav-bar/tab-nav-bar.component.ts';

SbbTabNavBarElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/tabs/tab-nav-bar.js' has been deprecated.
Use either '@sbb-esta/elements/tabs.js' or '@sbb-esta/elements/tabs.pure.js' instead.`);
