import { SbbLinkBaseElement } from '../../core/base-elements.ts';
import { SbbHeaderActionCommonElementMixin } from '../common.ts';

/**
 * It displays a link element that can be used in the `sbb-header` component.
 *
 * @slot icon - Slot used to render the link icon.
 * @slot - Use the unnamed slot to add content to the `sbb-header-link`.
 */
export class SbbHeaderLinkElement extends SbbHeaderActionCommonElementMixin(SbbLinkBaseElement) {
  public static override readonly elementName: string = 'sbb-header-link';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-header-link': SbbHeaderLinkElement;
  }
}
