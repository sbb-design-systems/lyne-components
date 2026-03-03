/** @entrypoint */
import { SbbCardLinkElement } from './card-link/card-link.component.ts';

export * from './card-link/card-link.component.ts';

SbbCardLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/card/card-link.js' has been deprecated.
Use either '@sbb-esta/elements/card.js' or '@sbb-esta/elements/card.pure.js' instead.`);
