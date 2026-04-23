import { SbbButtonBaseElement, SbbDisabledTabIndexActionMixin } from '../../core.ts';
import { SbbInlineLinkCommonElementMixin } from '../common/inline-link-common.ts';

/**
 * It displays a link enhanced with the SBB Design, which will behave as a button.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-button`.
 */
export class SbbLinkButtonElement extends SbbInlineLinkCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) {
  public static override readonly elementName: string = 'sbb-link-button';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-button': SbbLinkButtonElement;
  }
}
