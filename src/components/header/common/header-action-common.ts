import { property } from 'lit/decorators.js';
import type { CSSResultGroup, LitElement } from 'lit/development';

import type { Constructor, SbbIconNameMixinType } from '../../core/common-behaviors';
import { SbbIconNameMixin } from '../../core/common-behaviors';
import { isBreakpoint, toggleDatasetEntry } from '../../core/dom';
import { actionElementHandlerAspect, HandlerRepository } from '../../core/eventing';
import type { SbbHorizontalFrom } from '../../core/interfaces';
import { AgnosticResizeObserver } from '../../core/observers';

import style from './header-action.scss?lit&inline';

export declare class SbbHeaderActionCommonElementMixinType implements SbbIconNameMixinType {
  public expandFrom: SbbHorizontalFrom;
  public iconName: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbHeaderActionCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbHeaderActionCommonElementMixinType> & T => {
  class SbbHeaderActionCommonElement
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

    private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

    public override connectedCallback(): void {
      super.connectedCallback();
      this._documentResizeObserver.observe(document.documentElement);
      this._updateExpanded();
      this._handlerRepository.connect();
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._documentResizeObserver.disconnect();
      this._handlerRepository.disconnect();
    }

    private _updateExpanded(): void {
      toggleDatasetEntry(this, 'expanded', !isBreakpoint('zero', this.expandFrom));
    }
  }
  return SbbHeaderActionCommonElement as unknown as Constructor<SbbHeaderActionCommonElementMixinType> &
    T;
};
