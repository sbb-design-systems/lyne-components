/** @entrypoint */
import { SbbOptionHintElement } from './option-hint/option-hint.component.ts';

export * from './option-hint/option-hint.component.ts';

SbbOptionHintElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/option/option-hint.js' has been deprecated.
Use either '@sbb-esta/elements/option.js' or '@sbb-esta/elements/option.pure.js' instead.`);
