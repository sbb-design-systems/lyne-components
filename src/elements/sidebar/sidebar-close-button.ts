/** @entrypoint */
import { SbbSidebarCloseButtonElement } from './sidebar-close-button/sidebar-close-button.component.ts';

export * from './sidebar-close-button/sidebar-close-button.component.ts';

SbbSidebarCloseButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/sidebar/sidebar-close-button.js' has been deprecated.
Use either '@sbb-esta/elements/sidebar.js' or '@sbb-esta/elements/sidebar.pure.js' instead.`);
