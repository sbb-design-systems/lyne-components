/** @entrypoint */
import { SbbCardBadgeElement } from './card-badge/card-badge.component.ts';

export * from './card-badge/card-badge.component.ts';

SbbCardBadgeElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/card/card-badge.js' has been deprecated.
Use either '@sbb-esta/elements/card.js' or '@sbb-esta/elements/card.pure.js' instead.`);
