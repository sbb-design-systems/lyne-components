/** @entrypoint */
import { SbbHeaderButtonElement } from './header-button/header-button.component.ts';

export * from './header-button/header-button.component.ts';

SbbHeaderButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/header/header-button.js' has been deprecated.
Use either '@sbb-esta/elements/header.js' or '@sbb-esta/elements/header.pure.js' instead.`);
