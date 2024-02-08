import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type SbbActionBaseElement,
  type AbstractConstructor,
  type SbbDisabledMixinType,
  type SbbIconNameMixinType,
  type SbbNegativeMixinType,
  NamedSlotStateController,
  SbbIconNameMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import { isValidAttribute, toggleDatasetEntry } from '../../core/dom';

import '../../icon';
import style from './button.scss?lit&inline';

export type SbbButtonSize = 'l' | 'm';
export type SbbButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'transparent';

export declare class SbbButtonCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, Partial<SbbIconNameMixinType>
{
  public variant: SbbButtonVariant;
  public size?: SbbButtonSize;
  public disabled: boolean;
  public iconName?: string;
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  abstract class SbbButtonCommonElement
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Variant of the button, like primary, secondary etc. */
    @property({ reflect: true }) public variant: SbbButtonVariant = 'primary';

    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    public constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    public override connectedCallback(): void {
      super.connectedCallback();

      const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
      if (formField) {
        toggleDatasetEntry(this, 'iconSmall', true);
        this.negative = isValidAttribute(formField, 'negative');
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-button__icon"> ${super.renderIconSlot()} </span>
        <span class="sbb-button__label">
          <slot></slot>
        </span>
      `;
    }
  }
  return SbbButtonCommonElement as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
