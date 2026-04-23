import { SbbButtonBaseElement } from '../../core.ts';
import { SbbCardActionCommonElementMixin } from '../common/card-action-common.ts';

/**
 * It turns the `sbb-card` into a button element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the button (important!).
 *   This is relevant for SEO and screen readers.
 */
export class SbbCardButtonElement extends SbbCardActionCommonElementMixin(SbbButtonBaseElement) {
  public static override readonly elementName: string = 'sbb-card-button';
  protected override actionRole: 'link' | 'button' = 'button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-button': SbbCardButtonElement;
  }
}
