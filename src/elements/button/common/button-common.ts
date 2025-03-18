import { nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { forceType, hostAttributes, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import type {
  AbstractConstructor,
  SbbDisabledMixinType,
  SbbNegativeMixinType,
} from '../../core/mixins.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import { SbbIconNameMixin, type SbbIconNameMixinType } from '../../icon.js';

export type SbbButtonCommonElement = SbbButtonCommonElementMixinType & SbbActionBaseElement;

export type SbbButtonSize = 'l' | 'm' | 's';

export declare class SbbButtonCommonElementMixinType
  implements SbbNegativeMixinType, Partial<SbbDisabledMixinType>, Partial<SbbIconNameMixinType>
{
  public accessor size: SbbButtonSize;
  public accessor loading: boolean;
  public accessor disabled: boolean;
  public accessor iconName: string;
  public accessor negative: boolean;
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
     */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor loading: boolean = false;

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('loading')) {
        if (this.loading) {
          this.setAttribute('aria-busy', 'true');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.removeAttribute('aria-busy');
          this.removeAttribute('aria-disabled');
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
          ? html`<div class="sbb-button-loading-border">
              <div class="sbb-button-loading-trail"></div>
            </div>`
          : nothing}
      `;
    }
  }
  return SbbButtonCommonElementClass as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
