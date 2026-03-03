/** @entrypoint */
import { SbbSidebarContainerElement } from './sidebar-container/sidebar-container.component.ts';

export * from './sidebar-container/sidebar-container.component.ts';

SbbSidebarContainerElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/sidebar/sidebar-container.js' has been deprecated.
Use either '@sbb-esta/elements/sidebar.js' or '@sbb-esta/elements/sidebar.pure.js' instead.`);
