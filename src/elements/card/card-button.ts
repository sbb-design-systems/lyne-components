/** @entrypoint */
import { SbbCardButtonElement } from './card-button/card-button.component.ts';

export * from './card-button/card-button.component.ts';

SbbCardButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/card/card-button.js' has been deprecated.
Use either '@sbb-esta/elements/card.js' or '@sbb-esta/elements/card.pure.js' instead.`);
