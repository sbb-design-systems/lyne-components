/** @entrypoint */
import { SbbFlipCardElement } from './flip-card/flip-card.component.ts';

export * from './flip-card/flip-card.component.ts';

SbbFlipCardElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/flip-card/flip-card.js' has been deprecated.
Use either '@sbb-esta/elements/flip-card.js' or '@sbb-esta/elements/flip-card.pure.js' instead.`);
