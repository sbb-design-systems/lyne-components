import { nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { forceType, hostAttributes, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import type { AbstractConstructor } from '../../core/mixins.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import { SbbIconNameMixin } from '../../icon.js';

export type SbbButtonSize = 'l' | 'm' | 's';

export declare class SbbButtonCommonElementMixinType extends SbbNegativeMixin(
  SbbIconNameMixin(SbbActionBaseElement),
) {
  public accessor size: SbbButtonSize;
  public accessor loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  @hostAttributes({
    'data-sbb-button': '',
  })
  @slotState()
  abstract class SbbButtonCommonElementClass
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    /**
     * Size variant, either l, m or s.
     * @default 'l' / 's' (lean)
     */
    @property({ reflect: true }) public accessor size: SbbButtonSize = isLean() ? 's' : 'l';

    /**
     * Whether the button indicates a loading state.
     * The animation kicks in after a delay of 300ms, configurable with --sbb-button-loading-delay CSS variable.
     */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor loading: boolean = false;

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('loading')) {
        if (this.loading) {
          this.internals.ariaBusy = 'true';
          this.internals.ariaDisabled = 'true';
          // For performance reasons, we only set the width if the button is loading and don't track width changes during active loading state.
          const offsetWidth = this.offsetWidth;
          this.style?.setProperty('--sbb-button-width', `${offsetWidth || 136}px`);
        } else {
          this.internals.ariaBusy = null;
          this.style?.removeProperty('--sbb-button-width');
          if (!this.maybeDisabledInteractive) {
            this.internals.ariaDisabled = null;
          }
        }
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        ${super.renderIconSlot()}
        <span class="sbb-button__label">
          <slot></slot>
        </span>
        ${this.loading && !this.maybeDisabled
          ? html`<div class="sbb-button-loading-border"></div>`
          : nothing}
      `;
    }
  }
  return SbbButtonCommonElementClass as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
