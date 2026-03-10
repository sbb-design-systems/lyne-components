/** @entrypoint */
import { SbbCardElement } from './card/card.component.ts';

export * from './card/card.component.ts';

SbbCardElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/card/card.js' has been deprecated.
Use either '@sbb-esta/elements/card.js' or '@sbb-esta/elements/card.pure.js' instead.`);
