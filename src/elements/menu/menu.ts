/** @entrypoint */
import { SbbMenuElement } from './menu/menu.component.ts';

export * from './menu/menu.component.ts';

SbbMenuElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/menu/menu.js' has been deprecated.
Use either '@sbb-esta/elements/menu.js' or '@sbb-esta/elements/menu.pure.js' instead.`);
