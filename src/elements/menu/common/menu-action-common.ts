import { type CSSResultGroup, type TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import { type AbstractConstructor, SbbDisabledMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { SbbIconNameMixin } from '../../icon.ts';

import style from './menu-action.scss?lit&inline';

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
    public static styles: CSSResultGroup = [boxSizingStyles, style];

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
