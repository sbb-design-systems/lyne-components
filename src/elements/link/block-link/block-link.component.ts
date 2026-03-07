import { SbbLinkBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { SbbBlockLinkCommonElementMixin } from '../common.ts';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-block-link`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
export class SbbBlockLinkElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledMixin(SbbLinkBaseElement),
) {
  public static override readonly elementName: string = 'sbb-block-link';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link': SbbBlockLinkElement;
  }
}
