/** @entrypoint */
import { SbbTrainBlockedPassageElement } from './train-blocked-passage/train-blocked-passage.component.ts';

export * from './train-blocked-passage/train-blocked-passage.component.ts';

SbbTrainBlockedPassageElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/train/train-blocked-passage.js' has been deprecated.
Use either '@sbb-esta/elements/train.js' or '@sbb-esta/elements/train.pure.js' instead.`);
