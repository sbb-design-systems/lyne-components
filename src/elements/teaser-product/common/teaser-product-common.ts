import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type AbstractConstructor,
  boxSizingStyles,
  SbbActionBaseElement,
  SbbNegativeMixin,
} from '../../core.ts';

import style from './teaser-product-common.scss?inline';

export declare class SbbTeaserProductCommonElementMixinType extends SbbNegativeMixin(
  SbbActionBaseElement,
) {
  public accessor imageAlignment: 'after' | 'before';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTeaserProductCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbTeaserProductCommonElementMixinType> & T => {
  const baseClass = SbbNegativeMixin(superClass);

  abstract class SbbTeaserProductCommonElement
    extends baseClass
    implements SbbTeaserProductCommonElementMixinType
  {
    public static styles: CSSResultGroup = [
      (baseClass as unknown as { styles: CSSResultGroup }).styles ?? [],
      boxSizingStyles,
      unsafeCSS(style),
    ];

    /**
     * Whether the fully visible part of the image is aligned 'before' or 'after' the content.
     * Only relevant starting from large breakpoint.
     */
    @property({ attribute: 'image-alignment', reflect: true })
    public accessor imageAlignment: 'after' | 'before' = 'after';

    protected override renderTemplate(): TemplateResult {
      return html`
        <div class="sbb-teaser-product__root">
          <div class="sbb-teaser-product__image-container"><slot name="image"></slot></div>
          <div class="sbb-teaser-product__container">
            <span class="sbb-teaser-product__content">
              <slot></slot>
            </span>
            <div class="sbb-teaser-product__footnote">
              <slot name="footnote"></slot>
            </div>
          </div>
        </div>
      `;
    }
  }
  return SbbTeaserProductCommonElement as AbstractConstructor<SbbTeaserProductCommonElementMixinType> &
    T;
};
