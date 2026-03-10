/** @entrypoint */
import { SbbIconSidebarContainerElement } from './icon-sidebar-container/icon-sidebar-container.component.ts';

export * from './icon-sidebar-container/icon-sidebar-container.component.ts';

SbbIconSidebarContainerElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/icon-sidebar/icon-sidebar-container.js' has been deprecated.
Use either '@sbb-esta/elements/icon-sidebar.js' or '@sbb-esta/elements/icon-sidebar.pure.js' instead.`);
