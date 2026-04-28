import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { AbstractConstructor, SbbActionBaseElement, SbbHorizontalFrom } from '../../core.ts';
import { boxSizingStyles } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import style from './header-action.scss?inline';

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
  abstract class SbbHeaderActionCommonElement
    extends SbbIconNameMixin(superClass)
    implements Partial<SbbHeaderActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [
      (superClass as unknown as { styles: CSSResultGroup }).styles ?? [],
      boxSizingStyles,
      unsafeCSS(style),
    ];

    /**
     * Used to set the minimum breakpoint from which the text is displayed.
     * E.g. if set to 'large', the text will be visible for breakpoints large and ultra,
     * and hidden for all the others. Ignored if no icon is set.
     */
    // TODO: Needs a breaking change to work with the 'no-default-reflect' behavior
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
