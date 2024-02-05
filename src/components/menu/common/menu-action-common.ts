import { spread } from '@open-wc/lit-helpers';
import { type CSSResultGroup, type LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import type {
  AbstractConstructor,
  SbbDisabledMixinType,
  SbbIconNameMixinType,
} from '../../core/common-behaviors';
import { SbbDisabledTabIndexActionMixin, SbbIconNameMixin } from '../../core/common-behaviors';

import style from './menu-action.scss?lit&inline';

export declare class SbbMenuActionCommonElementMixinType
  implements SbbDisabledMixinType, Partial<SbbIconNameMixinType>
{
  public amount?: string;
  public disabled: boolean;
  public iconName?: string;
  protected renderMenuActionCommonTemplate: (
    attributes?: Record<string, string>,
    customTemplate?: TemplateResult | typeof nothing,
  ) => TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbMenuActionCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbMenuActionCommonElementMixinType> & T => {
  abstract class SbbMenuActionCommonElement
    extends SbbIconNameMixin(SbbDisabledTabIndexActionMixin(superClass))
    implements Partial<SbbMenuActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Value shown as badge at component end. */
    @property() public amount: string | undefined;

    protected renderMenuActionCommonTemplate(
      attributes?: Record<string, string>,
      customTemplate?: TemplateResult | typeof nothing,
    ): TemplateResult {
      const TAG_NAME: string = attributes ? 'a' : 'span';

      /* eslint-disable lit/binding-positions */
      return html`
        <${unsafeStatic(TAG_NAME)} class="sbb-menu-action" ${attributes ? spread(attributes) : nothing}>
          <span class="sbb-menu-action__content">
            <span class="sbb-menu-action__icon">
              ${super.renderIconSlot()}
            </span>
            <span class="sbb-menu-action__label">
              <slot></slot>
            </span>
            ${
              this.amount && !this.disabled
                ? html`<span class="sbb-menu-action__amount">${this.amount}</span>`
                : nothing
            }
          </span>
          ${customTemplate}
        </${unsafeStatic(TAG_NAME)}>
      `;
      /* eslint-enable lit/binding-positions */
    }
  }
  return SbbMenuActionCommonElement as unknown as AbstractConstructor<SbbMenuActionCommonElementMixinType> &
    T;
};
