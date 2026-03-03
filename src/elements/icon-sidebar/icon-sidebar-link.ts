/** @entrypoint */
import { SbbIconSidebarLinkElement } from './icon-sidebar-link/icon-sidebar-link.component.ts';

export * from './icon-sidebar-link/icon-sidebar-link.component.ts';

SbbIconSidebarLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/icon-sidebar/icon-sidebar-link.js' has been deprecated.
Use either '@sbb-esta/elements/icon-sidebar.js' or '@sbb-esta/elements/icon-sidebar.pure.js' instead.`);
