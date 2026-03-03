/** @entrypoint */
import { SbbIconSidebarElement } from './icon-sidebar/icon-sidebar.component.ts';

export * from './icon-sidebar/icon-sidebar.component.ts';

SbbIconSidebarElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/icon-sidebar/icon-sidebar.js' has been deprecated.
Use either '@sbb-esta/elements/icon-sidebar.js' or '@sbb-esta/elements/icon-sidebar.pure.js' instead.`);
