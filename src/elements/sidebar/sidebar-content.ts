/** @entrypoint */
import { SbbSidebarContentElement } from './sidebar-content/sidebar-content.component.ts';

export * from './sidebar-content/sidebar-content.component.ts';

SbbSidebarContentElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/sidebar/sidebar-content.js' has been deprecated.
Use either '@sbb-esta/elements/sidebar.js' or '@sbb-esta/elements/sidebar.pure.js' instead.`);
