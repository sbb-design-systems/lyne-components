/** @entrypoint */
import { SbbHeaderLinkElement } from './header-link/header-link.component.ts';

export * from './header-link/header-link.component.ts';

SbbHeaderLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/header/header-link.js' has been deprecated.
Use either '@sbb-esta/elements/header.js' or '@sbb-esta/elements/header.pure.js' instead.`);
