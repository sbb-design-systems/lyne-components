import { type CSSResultGroup, unsafeCSS } from 'lit';

import { boxSizingStyles, SbbElement } from '../../core.ts';
import { SbbTrainFormationOrientationMixin } from '../train-formation-orientation-mixin.ts';

import style from './train-blocked-passage.scss?inline';

/**
 * It visually displays a blocked passage between train wagons.
 */
export class SbbTrainBlockedPassageElement extends SbbTrainFormationOrientationMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-train-blocked-passage';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-blocked-passage': SbbTrainBlockedPassageElement;
  }
}
