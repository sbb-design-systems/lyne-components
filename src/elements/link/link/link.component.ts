import { SbbLinkBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { SbbInlineLinkCommonElementMixin } from '../common.ts';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link`.
 */
export class SbbLinkElement extends SbbInlineLinkCommonElementMixin(
  SbbDisabledMixin(SbbLinkBaseElement),
) {
  public static override readonly elementName: string = 'sbb-link';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link': SbbLinkElement;
  }
}
