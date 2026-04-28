import { state } from 'lit/decorators.js';

import type { SbbElement } from '../core/base-elements/element.ts';
import type { AbstractConstructor } from '../core/mixins/constructor.ts';
import { type SbbOrientation, SbbPropertyWatcherController } from '../core.ts';

import type { SbbTrainFormationElement } from './train-formation/train-formation.component.ts';

export declare class SbbTrainFormationOrientationMixinType {
  protected readonly orientation: SbbOrientation | null;
}

/**
 * Mixin that reads the `orientation` property from the closest `sbb-train-formation`
 * and reflects it as a CSS custom state (`orientation-horizontal` / `orientation-vertical`).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTrainFormationOrientationMixin = <T extends AbstractConstructor<SbbElement>>(
  superClass: T,
): AbstractConstructor<SbbTrainFormationOrientationMixinType> & T => {
  abstract class SbbTrainFormationOrientationElement
    extends superClass
    implements Partial<SbbTrainFormationOrientationMixinType>
  {
    @state() protected accessor orientation: SbbOrientation | null = null;

    protected constructor(...args: any[]) {
      super(...args);
      this.addController(
        new SbbPropertyWatcherController(this, () => this.closest('sbb-train-formation'), {
          orientation: (t: SbbTrainFormationElement) => {
            if (this.orientation) {
              this.internals.states.delete(`orientation-${this.orientation}`);
            }
            this.orientation = t.orientation;
            if (this.orientation) {
              this.internals.states.add(`orientation-${this.orientation}`);
            }
          },
        }),
      );
    }
  }

  return SbbTrainFormationOrientationElement as unknown as AbstractConstructor<SbbTrainFormationOrientationMixinType> &
    T;
};
