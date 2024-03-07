import type { TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  hostAttributes,
  NamedSlotStateController,
  type SbbActionBaseElement,
  type SbbDisabledMixinType,
  SbbIconNameMixin,
  type SbbIconNameMixinType,
  SbbNegativeMixin,
  type SbbNegativeMixinType,
} from '../../core/common-behaviors';

import '../../icon';

export type SbbButtonCommonElement = SbbButtonCommonElementMixinType & SbbActionBaseElement;

export type SbbButtonSize = 'l' | 'm';

export declare class SbbButtonCommonElementMixinType
  implements SbbNegativeMixinType, Partial<SbbDisabledMixinType>, Partial<SbbIconNameMixinType>
{
  public size?: SbbButtonSize;
  public disabled: boolean;
  public iconName?: string;
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  @hostAttributes({
    'data-sbb-button': '',
  })
  abstract class SbbButtonCommonElementClass
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    protected constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
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
  return SbbButtonCommonElementClass as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
