/** @entrypoint */
import { SbbTrainElement } from './train/train.component.ts';

export * from './train/train.component.ts';

SbbTrainElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/train/train.js' has been deprecated.
Use either '@sbb-esta/elements/train.js' or '@sbb-esta/elements/train.pure.js' instead.`);
