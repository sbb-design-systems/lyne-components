/** @entrypoint */
import { SbbTrainWagonElement } from './train-wagon/train-wagon.component.ts';

export * from './train-wagon/train-wagon.component.ts';

SbbTrainWagonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/train/train-wagon.js' has been deprecated.
Use either '@sbb-esta/elements/train.js' or '@sbb-esta/elements/train.pure.js' instead.`);
