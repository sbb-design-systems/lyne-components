import { customElement } from 'lit/decorators.js';

import { SbbActionBaseElement } from '../../core/base-elements.js';
import { SbbTeaserProductCommonElementMixin } from '../common/teaser-product-base-element.js';

/**
 * Displays a text and a footnote, combined with an image, to tease a product
 *
 * @slot - Use this slot to provide the main content.
 * @slot image - Use this slot to provide a sbb-image as background.
 * @slot footnote - Use this slot to provide a footnote.
 */
@customElement('sbb-teaser-product-static')
export class SbbTeaserProductStaticElement extends SbbTeaserProductCommonElementMixin(
  SbbActionBaseElement,
) {}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-product-static': SbbTeaserProductStaticElement;
  }
}
