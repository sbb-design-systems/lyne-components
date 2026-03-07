import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledTabIndexActionMixin } from '../../core/mixins.ts';
import { SbbInlineLinkCommonElementMixin } from '../common.ts';

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
