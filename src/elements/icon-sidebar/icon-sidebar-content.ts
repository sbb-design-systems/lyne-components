/** @entrypoint */
import { SbbIconSidebarContentElement } from './icon-sidebar-content/icon-sidebar-content.component.ts';

export * from './icon-sidebar-content/icon-sidebar-content.component.ts';

SbbIconSidebarContentElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/icon-sidebar/icon-sidebar-content.js' has been deprecated.
Use either '@sbb-esta/elements/icon-sidebar.js' or '@sbb-esta/elements/icon-sidebar.pure.js' instead.`);
