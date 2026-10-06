import { SbbActionBaseElement, SbbDisabledMixin } from '../../core.ts';
import { SbbBlockLinkCommonElementMixin } from '../common/block-link-common.ts';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-block-link-static`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
export class SbbBlockLinkStaticElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {
  public static override readonly elementName: string = 'sbb-block-link-static';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link-static': SbbBlockLinkStaticElement;
  }
}
