/** @entrypoint */
import { SbbIconSidebarButtonElement } from './icon-sidebar-button/icon-sidebar-button.component.ts';

export * from './icon-sidebar-button/icon-sidebar-button.component.ts';

SbbIconSidebarButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/icon-sidebar/icon-sidebar-button.js' has been deprecated.
Use either '@sbb-esta/elements/icon-sidebar.js' or '@sbb-esta/elements/icon-sidebar.pure.js' instead.`);
