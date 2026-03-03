/** @entrypoint */
import { SbbMenuLinkElement } from './menu-link/menu-link.component.ts';

export * from './menu-link/menu-link.component.ts';

SbbMenuLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/menu/menu-link.js' has been deprecated.
Use either '@sbb-esta/elements/menu.js' or '@sbb-esta/elements/menu.pure.js' instead.`);
