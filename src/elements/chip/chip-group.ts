/** @entrypoint */
import { SbbChipGroupElement } from './chip-group/chip-group.component.ts';

export * from './chip-group/chip-group.component.ts';

SbbChipGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/chip/chip-group.js' has been deprecated.
Use either '@sbb-esta/elements/chip.js' or '@sbb-esta/elements/chip.pure.js' instead.`);
