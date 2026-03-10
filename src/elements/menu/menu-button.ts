/** @entrypoint */
import { SbbMenuButtonElement } from './menu-button/menu-button.component.ts';

export * from './menu-button/menu-button.component.ts';

SbbMenuButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/menu/menu-button.js' has been deprecated.
Use either '@sbb-esta/elements/menu.js' or '@sbb-esta/elements/menu.pure.js' instead.`);
