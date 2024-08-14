import { html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators.js';
import {
  SbbNegativeMixin,
  type SbbNegativeMixinType,
  type AbstractConstructor,
} from '../../core/mixins.js';

export declare class SbbTeaserProductCommonElementMixinType extends SbbNegativeMixinType {
  public imageAlignment?: 'after' | 'before';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTeaserProductCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbTeaserProductCommonElementMixinType> & T => {
  @slotState()
  abstract class SbbTeaserProductCommonElement
    extends SbbNegativeMixin(superClass)
    implements SbbTeaserProductCommonElementMixinType
  {
    /**
     * Whether the fully visible part of the image is aligned 'before' or 'after' the content.
     * Only relevant starting from large breakpoint.
     */
    @property({ attribute: 'image-alignment', reflect: true })
    public imageAlignment: 'after' | 'before' = 'after';

    protected override renderTemplate(): TemplateResult {
      return html`
        <div class="sbb-teaser-product__image-container"><slot name="image"></slot></div>
        <span class="sbb-teaser-product__container">
          <span class="sbb-teaser-product__content">
            <slot></slot>
          </span>
          <span class="sbb-teaser-product__footnote">
            <slot name="footnote"></slot>
          </span>
        </span>
      `;
    }
  }
  return SbbTeaserProductCommonElement as AbstractConstructor<SbbTeaserProductCommonElementMixinType> &
    T;
};
