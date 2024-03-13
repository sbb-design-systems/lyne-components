import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type SbbActionBaseElement,
  type AbstractConstructor,
  type SbbIconNameMixinType,
  SbbIconNameMixin,
} from '../../core/common-behaviors';
import { isBreakpoint } from '../../core/dom';
import type { SbbHorizontalFrom } from '../../core/interfaces';
import { AgnosticResizeObserver } from '../../core/observers';

import '../../icon';
import style from './header-action.scss?lit&inline';

export declare class SbbHeaderActionCommonElementMixinType
  implements Partial<SbbIconNameMixinType>
{
  public expandFrom: SbbHorizontalFrom;
  public iconName?: string;
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
    public static styles: CSSResultGroup = style;

    /**
     * Used to set the minimum breakpoint from which the text is displayed.
     * E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra,
     * and hidden for all the others.
     */
    @property({ attribute: 'expand-from', reflect: true })
    public set expandFrom(value: SbbHorizontalFrom) {
      this._expandFrom = value;
      this._updateExpanded();
    }
    public get expandFrom(): SbbHorizontalFrom {
      return this._expandFrom;
    }
    private _expandFrom: SbbHorizontalFrom = 'medium';

    private _documentResizeObserver = new AgnosticResizeObserver(() => this._updateExpanded());

    private _updateExpanded(): void {
      this.toggleAttribute('data-expanded', !isBreakpoint('zero', this.expandFrom));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._documentResizeObserver.observe(document.documentElement);
      this._updateExpanded();
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._documentResizeObserver.disconnect();
    }

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
