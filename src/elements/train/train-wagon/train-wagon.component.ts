import type { TemplateResult } from 'lit';

import { SbbElement } from '../../core.ts';
import { SbbTrainWagonMixin } from '../train-wagon-common.ts';

/**
 * It displays a train compartment within a `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the wagon.
 */
export class SbbTrainWagonElement extends SbbTrainWagonMixin(SbbElement) {
  public static override readonly elementName: string = 'sbb-train-wagon';

  public override render(): TemplateResult {
    return this.renderTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-wagon': SbbTrainWagonElement;
  }
}
