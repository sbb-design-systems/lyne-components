import { SbbActionBaseElement } from '../../core/base-elements.ts';
import { SbbDisabledMixin } from '../../core/mixins.ts';
import { SbbInlineLinkCommonElementMixin } from '../common.ts';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-static`.
 */
export class SbbLinkStaticElement extends SbbInlineLinkCommonElementMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {
  public static override readonly elementName: string = 'sbb-link-static';
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-static': SbbLinkStaticElement;
  }
}
