import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';

import { type AbstractConstructor, SbbActionBaseElement, SbbDisabledMixin } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import style from './menu-action.scss?inline';

export declare class SbbMenuActionCommonElementMixinType extends SbbIconNameMixin(
  SbbDisabledMixin(SbbActionBaseElement),
) {}

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
    public static readonly events = {
      iconchange: 'iconchange',
    } as const;
    public static styles: CSSResultGroup = [unsafeCSS(style)];

    private _handleIconChange(): void {
      /** @internal */
      this.dispatchEvent(new Event('iconchange', { bubbles: true, composed: true }));
    }

    protected override updated(changedProperties: PropertyValues<this>): void {
      super.updated(changedProperties);

      if (changedProperties.has('iconName')) {
        this._handleIconChange();
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon"> ${super.renderIconSlot()} </span>
          <span class="sbb-menu-action__label">
            <slot @slotchange=${this._handleIconChange}></slot>
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
