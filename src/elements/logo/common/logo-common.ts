import { type CSSResultGroup, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { SbbElement, type SbbElementConstructor } from '../../core/base-elements/element.ts';
import { forceType } from '../../core/decorators/force-type.ts';
import type { AbstractConstructor } from '../../core/mixins/constructor.ts';
import { SbbNegativeMixin } from '../../core/mixins/negative-mixin.ts';

import style from './logo-common.scss?inline';

export declare abstract class SbbLogoCommonElementMixinType extends SbbElement {
  public accessor protectiveRoom: 'none' | 'minimal' | 'ideal';
  public accessor accessibilityLabel: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLogoCommonElementMixin = <
  T extends AbstractConstructor<SbbElement> & SbbElementConstructor,
>(
  superclass: T,
): AbstractConstructor<SbbLogoCommonElementMixinType> & T => {
  abstract class SbbLogoCommonElement
    extends SbbNegativeMixin(superclass)
    implements Partial<SbbLogoCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [unsafeCSS(style)];

    /** Visual protective room around logo. */
    @property({ attribute: 'protective-room', reflect: true })
    public accessor protectiveRoom: 'none' | 'minimal' | 'ideal' = 'ideal';

    /** Accessibility label which will be forwarded to the SVG logo. */
    @forceType()
    @property({ attribute: 'accessibility-label' })
    public accessor accessibilityLabel: string = 'Logo';
  }

  return SbbLogoCommonElement as unknown as AbstractConstructor<SbbLogoCommonElementMixinType> & T;
};
