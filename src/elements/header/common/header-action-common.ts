import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators/slot-state.js';
import type { SbbHorizontalFrom } from '../../core/interfaces.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import { boxSizingStyles } from '../../core/styles.js';
import { SbbIconNameMixin } from '../../icon.js';

import style from './header-action.scss?lit&inline';

export declare class SbbHeaderActionCommonElementMixinType extends SbbIconNameMixin(
  SbbActionBaseElement,
) {
  public accessor expandFrom: SbbHorizontalFrom;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbHeaderActionCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbHeaderActionCommonElementMixinType> & T => {
  @slotState()
  abstract class SbbHeaderActionCommonElement
    extends SbbIconNameMixin(superClass)
    implements Partial<SbbHeaderActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [boxSizingStyles, style];

    /**
     * Used to set the minimum breakpoint from which the text is displayed.
     * E.g. if set to 'large', the text will be visible for breakpoints large and ultra,
     * and hidden for all the others. Ignored if no icon is set.
     */
    @property({ attribute: 'expand-from', reflect: true })
    public accessor expandFrom: SbbHorizontalFrom = 'large';

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-header-action__wrapper">
          <span class="sbb-header-action__icon"> ${super.renderIconSlot()} </span>
          <span class="sbb-header-action__text">
            <slot></slot>
          </span>
        </span>
      `;
    }
  }
  return SbbHeaderActionCommonElement as unknown as AbstractConstructor<SbbHeaderActionCommonElementMixinType> &
    T;
};
