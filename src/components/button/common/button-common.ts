import type { TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  NamedSlotStateController,
  type SbbActionBaseElement,
  type SbbDisabledMixinType,
  SbbIconNameMixin,
  type SbbIconNameMixinType,
  SbbNegativeMixin,
  type SbbNegativeMixinType,
} from '../../core/common-behaviors';
import type {
  SbbButtonElement,
  SbbButtonLinkElement,
  SbbSecondaryButtonElement,
  SbbSecondaryButtonLinkElement,
  SbbTertiaryButtonElement,
  SbbTertiaryButtonLinkElement,
  SbbTransparentButtonElement,
  SbbTransparentButtonLinkElement,
} from '../index';

import '../../icon';

export const COMBINED_BUTTON_AND_BUTTON_LINK_TAGS: string =
  'sbb-button, sbb-secondary-button, sbb-tertiary-button, sbb-transparent-button, sbb-button-link, sbb-secondary-button-link, sbb-tertiary-button-link, sbb-transparent-button-link';
export type CombinedButtonAndButtonLinkElements =
  | SbbButtonElement
  | SbbSecondaryButtonElement
  | SbbTertiaryButtonElement
  | SbbTransparentButtonElement
  | SbbButtonLinkElement
  | SbbSecondaryButtonLinkElement
  | SbbTertiaryButtonLinkElement
  | SbbTransparentButtonLinkElement;

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
  abstract class SbbButtonCommonElement
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    public constructor(...args: any[]) {
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
  return SbbButtonCommonElement as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
