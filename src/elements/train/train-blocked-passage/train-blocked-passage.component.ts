import { type CSSResultGroup, unsafeCSS } from 'lit';

import {
  boxSizingStyles,
  SbbElement,
  type SbbOrientation,
  SbbPropertyWatcherController,
} from '../../core.ts';
import type { SbbTrainFormationElement } from '../train-formation/train-formation.component.ts';

import style from './train-blocked-passage.scss?inline';

/**
 * It visually displays a blocked passage between train wagons.
 */
export class SbbTrainBlockedPassageElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-train-blocked-passage';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  private accessor _orientation: SbbOrientation | null = null;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-train-formation'), {
        orientation: (t: SbbTrainFormationElement) => {
          if (this._orientation) {
            this.internals.states.delete(`orientation-${this._orientation}`);
          }
          this._orientation = t.orientation;
          if (this._orientation) {
            this.internals.states.add(`orientation-${this._orientation}`);
          }
        },
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-blocked-passage': SbbTrainBlockedPassageElement;
  }
}
