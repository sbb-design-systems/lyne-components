import { SbbLinkBaseElement } from '../../core.ts';
import { SbbCardActionCommonElementMixin } from '../common/card-action-common.ts';

/**
 * It turns the `sbb-card` into a link element.
 *
 * @slot - Use the unnamed slot to add a descriptive label / title of the link (important!).
 *   This is relevant for SEO and screen readers.
 */
export class SbbCardLinkElement extends SbbCardActionCommonElementMixin(SbbLinkBaseElement) {
  public static override readonly elementName: string = 'sbb-card-link';
  protected override actionRole: 'link' | 'button' = 'link';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-link': SbbCardLinkElement;
  }
}
