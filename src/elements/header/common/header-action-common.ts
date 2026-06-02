import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  type SbbActionBaseElement,
  SbbPropertyWatcherController,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';
import type { SbbHeaderElement } from '../header/header.component.ts';

import style from './header-action.scss?inline';

export declare class SbbHeaderActionCommonElementMixinType extends SbbIconNameMixin(
  SbbActionBaseElement,
) {
  public accessor hideLabelBelow: 'small' | 'large' | 'ultra' | null;
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
    public static styles: CSSResultGroup = [unsafeCSS(style)];

    /**
     * Used to set the maximum breakpoint (not including) to which the text is displayed.
     * E.g. if set to 'large', the text will be visible for breakpoints large and ultra,
     * and hidden for all the others. Ignored if no icon is set.
     */
    @property({ attribute: 'hide-label-below', reflect: true })
    public accessor hideLabelBelow: 'small' | 'large' | 'ultra' | null = null;

    private _previousSize: SbbHeaderElement['size'] = null;

    protected constructor() {
      super();

      this.addController(
        new SbbPropertyWatcherController(this, () => this.closest('sbb-header'), {
          size: (header) => {
            if (this._previousSize) {
              this.internals.states.delete(`size-${this._previousSize}`);
            }
            this._previousSize = header.size ?? null;
            if (this._previousSize) {
              this.internals.states.add(`size-${this._previousSize}`);
            }
          },
        }),
      );
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
