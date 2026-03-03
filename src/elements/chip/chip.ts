/** @entrypoint */
import { SbbChipElement } from './chip/chip.component.ts';

export * from './chip/chip.component.ts';

SbbChipElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/chip/chip.js' has been deprecated.
Use either '@sbb-esta/elements/chip.js' or '@sbb-esta/elements/chip.pure.js' instead.`);
