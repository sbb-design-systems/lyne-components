import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins.ts';
import { SbbBlockLinkCommonElementMixin } from '../common/block-link-common.ts';

/**
 * It displays a link enhanced with the SBB Design, which will behave as a button.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-block-link-button`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
export class SbbBlockLinkButtonElement extends SbbBlockLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override readonly elementName: string = 'sbb-block-link-button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-block-link-button': SbbBlockLinkButtonElement;
  }
}
