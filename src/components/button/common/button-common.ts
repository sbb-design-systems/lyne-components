import { type CSSResultGroup, html, type LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import {
  type AbstractConstructor,
  type SbbDisabledMixinType,
  type SbbIconNameMixinType,
  type SbbNegativeMixinType,
} from '../../core/common-behaviors';
import {
  NamedSlotStateController,
  SbbDisabledMixin,
  SbbIconNameMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import { isValidAttribute, toggleDatasetEntry } from '../../core/dom';

import '../../icon';

import style from './button.scss?lit&inline';

export type SbbButtonSize = 'l' | 'm';
export type SbbButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'transparent';

export declare class SbbButtonCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, SbbIconNameMixinType
{
  public variant: SbbButtonVariant;
  public size?: SbbButtonSize;
  public disabled: boolean;
  public iconName: string;
  public negative: boolean;
  public renderIconSlot: () => TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  abstract class SbbButtonCommonElement
    extends SbbNegativeMixin(SbbDisabledMixin(SbbIconNameMixin(superClass)))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;
    /** Variant of the button, like primary, secondary etc. */
    @property({ reflect: true }) public variant: SbbButtonVariant = 'primary';

    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    protected constructor(...args: any[]) {
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

    public override renderIconSlot(): TemplateResult {
      return html` <span class="sbb-button__icon"> ${super.renderIconSlot()} </span> `;
    }
  }
  return SbbButtonCommonElement as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
