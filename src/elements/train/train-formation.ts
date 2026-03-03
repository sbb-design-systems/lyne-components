/** @entrypoint */
import { SbbTrainFormationElement } from './train-formation/train-formation.component.ts';

export * from './train-formation/train-formation.component.ts';

SbbTrainFormationElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/train/train-formation.js' has been deprecated.
Use either '@sbb-esta/elements/train.js' or '@sbb-esta/elements/train.pure.js' instead.`);
