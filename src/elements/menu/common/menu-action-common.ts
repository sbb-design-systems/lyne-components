import { type CSSResultGroup, html, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type AbstractConstructor,
  forceType,
  SbbActionBaseElement,
  SbbDisabledMixin,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import style from './menu-action.scss?inline';

export declare class SbbMenuActionCommonElementMixinType extends SbbIconNameMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {
  public hideIconSpace: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbMenuActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbMenuActionCommonElementMixinType> & T => {
  abstract class SbbMenuActionCommonElement
    extends SbbIconNameMixin(SbbDisabledMixin(superClass))
    implements SbbMenuActionCommonElementMixinType
  {
    public static styles: CSSResultGroup = [unsafeCSS(style)];

    /**
     * Whether the space reserved for the icon should be hidden.
     */
    @forceType()
    @property({ attribute: 'hide-icon-space', type: Boolean, reflect: true })
    public accessor hideIconSpace: boolean = false;

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-menu-action__content">
          ${!this.hideIconSpace ? html`<span class="sbb-menu-action__icon"> ${super.renderIconSlot()} </span>` : nothing}
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          <span class="sbb-menu-submenu__icon">
            <sbb-icon name="chevron-small-right-small"></sbb-icon>
          </span>
        </span>
      `;
    }
  }
  return SbbMenuActionCommonElement as unknown as AbstractConstructor<SbbMenuActionCommonElementMixinType> &
    T;
};
