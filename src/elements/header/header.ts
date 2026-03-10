/** @entrypoint */
import { SbbHeaderElement } from './header/header.component.ts';

export * from './header/header.component.ts';

SbbHeaderElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/header/header.js' has been deprecated.
Use either '@sbb-esta/elements/header.js' or '@sbb-esta/elements/header.pure.js' instead.`);
