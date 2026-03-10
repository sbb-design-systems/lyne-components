/** @entrypoint */
import { SbbFlipCardSummaryElement } from './flip-card-summary/flip-card-summary.component.ts';

export * from './flip-card-summary/flip-card-summary.component.ts';

SbbFlipCardSummaryElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/flip-card/flip-card-summary.js' has been deprecated.
Use either '@sbb-esta/elements/flip-card.js' or '@sbb-esta/elements/flip-card.pure.js' instead.`);
