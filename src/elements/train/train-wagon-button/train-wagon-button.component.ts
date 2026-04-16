import { SbbButtonBaseElement } from '../../core.ts';
import { SbbTrainWagonMixin } from '../train-wagon-common.ts';

/**
 * It displays a train compartment within a `sbb-train` component and behaves like a button.
 * It can be used to display the train compartment as well as to trigger an action, e.g., to show more details about the train compartment.
 *
 * @slot - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the `sbb-train-wagon`.
 */
export class SbbTrainWagonButtonElement extends SbbTrainWagonMixin(SbbButtonBaseElement) {
  public static override readonly elementName: string = 'sbb-train-wagon-button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-wagon-button': SbbTrainWagonButtonElement;
  }
}
