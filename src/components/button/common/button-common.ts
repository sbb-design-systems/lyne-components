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
import { ACTION_ELEMENTS, hostContext, isValidAttribute, toggleDatasetEntry } from '../../core/dom';
import { actionElementHandlerAspect, HandlerRepository } from '../../core/eventing';
import type { IsStaticProperty } from '../../core/interfaces';

import '../../icon';

import style from './button.scss?lit&inline';

export type SbbButtonSize = 'l' | 'm';
export type SbbButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'transparent';

export declare class SbbButtonCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, SbbIconNameMixinType
{
  public variant: SbbButtonVariant;
  public size?: SbbButtonSize;
  public isStatic: boolean;
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
    implements Partial<SbbButtonCommonElementMixinType>, IsStaticProperty
  {
    public static styles: CSSResultGroup = style;
    /** Variant of the button, like primary, secondary etc. */
    @property({ reflect: true }) public variant: SbbButtonVariant = 'primary';

    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    /**
     * Set this property to true if you want only a visual representation of a
     * button, but no interaction (a span instead of a link/button will be rendered).
     */
    @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

    private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

    public constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      // Check if the current element is nested in an action element.
      this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this);
      this._handlerRepository.connect();

      const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
      if (formField) {
        toggleDatasetEntry(this, 'iconSmall', true);
        this.negative = isValidAttribute(formField, 'negative');
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }

    public override renderIconSlot(): TemplateResult {
      return html` <span class="sbb-button__icon"> ${super.renderIconSlot()} </span> `;
    }
  }
  return SbbButtonCommonElement as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
