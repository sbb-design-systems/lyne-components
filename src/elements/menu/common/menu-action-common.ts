import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import {
  type AbstractConstructor,
  boxSizingStyles,
  SbbActionBaseElement,
  SbbDisabledMixin,
} from '../../core.ts';
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
  const baseClass = SbbIconNameMixin(SbbDisabledMixin(superClass));

  abstract class SbbMenuActionCommonElement
    extends baseClass
    implements SbbMenuActionCommonElementMixinType
  {
    public static styles: CSSResultGroup = [
      (baseClass as unknown as { styles: CSSResultGroup }).styles ?? [],
      boxSizingStyles,
      unsafeCSS(style),
    ];

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon"> ${super.renderIconSlot()} </span>
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
