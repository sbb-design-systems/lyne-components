/** @entrypoint */
import { SbbFlipCardDetailsElement } from './flip-card-details/flip-card-details.component.ts';

export * from './flip-card-details/flip-card-details.component.ts';

SbbFlipCardDetailsElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/flip-card/flip-card-details.js' has been deprecated.
Use either '@sbb-esta/elements/flip-card.js' or '@sbb-esta/elements/flip-card.pure.js' instead.`);
