/** @entrypoint */
import {
  SbbTrainBlockedPassageElement,
  SbbTrainElement,
  SbbTrainFormationElement,
  SbbTrainWagonElement,
} from './train.pure.ts';

export * from './train.pure.ts';

SbbTrainElement.define();
SbbTrainBlockedPassageElement.define();
SbbTrainFormationElement.define();
SbbTrainWagonElement.define();
