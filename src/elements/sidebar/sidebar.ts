/** @entrypoint */
import { SbbSidebarElement } from './sidebar/sidebar.component.ts';

export * from './sidebar/sidebar.component.ts';

SbbSidebarElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/sidebar/sidebar.js' has been deprecated.
Use either '@sbb-esta/elements/sidebar.js' or '@sbb-esta/elements/sidebar.pure.js' instead.`);
