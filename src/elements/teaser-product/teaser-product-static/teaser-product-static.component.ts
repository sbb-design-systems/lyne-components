import type { CSSResultGroup } from 'lit';

import { SbbActionBaseElement, boxSizingStyles } from '../../core.ts';
import {
  SbbTeaserProductCommonElementMixin,
  teaserProductCommonStyle,
} from '../common/teaser-product-common.ts';

/**
 * Displays a text and a footnote, combined with an image, to tease a product.
 *
 * @slot - Use this slot to provide the main content.
 * @slot image - Use this slot to provide an image or a `sbb-image` as a background.
 * @slot footnote - Use this slot to provide a footnote.
 * @cssprop [--sbb-teaser-product-background-gradient-start=25%] - At which percentage the background should start getting transparent.
 * @cssprop [--sbb-teaser-product-background-gradient-end=75%] - At which percentage the background should be fully transparent.
 */
export class SbbTeaserProductStaticElement extends SbbTeaserProductCommonElementMixin(
  SbbActionBaseElement,
) {
  public static override readonly elementName: string = 'sbb-teaser-product-static';
  public static override styles: CSSResultGroup = [boxSizingStyles, teaserProductCommonStyle];
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-product-static': SbbTeaserProductStaticElement;
  }
}
