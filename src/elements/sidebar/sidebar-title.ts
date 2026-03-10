/** @entrypoint */
import { SbbSidebarTitleElement } from './sidebar-title/sidebar-title.component.ts';

export * from './sidebar-title/sidebar-title.component.ts';

SbbSidebarTitleElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/sidebar/sidebar-title.js' has been deprecated.
Use either '@sbb-esta/elements/sidebar.js' or '@sbb-esta/elements/sidebar.pure.js' instead.`);
