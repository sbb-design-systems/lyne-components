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
import { toggleDatasetEntry } from '../../core/dom';

import '../../icon';
import commonStyle from './button-common.scss?lit&inline';
import style from './mini-button.scss?lit&inline';

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

export declare class SbbMiniButtonCommonElementMixinType implements SbbNegativeMixinType {
  public negative: boolean;
  protected renderIcon(): TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbMiniButtonCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbMiniButtonCommonElementMixinType> & T => {
  abstract class SbbMiniButtonCommonElement extends SbbNegativeMixin(superClass) {
    public static styles: CSSResultGroup = [commonStyle, style];

    public constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      toggleDatasetEntry(this, 'iconOnly', true);
    }

    protected renderIcon(): TemplateResult {
      throw new Error('Implementation needed!');
    }

    protected override renderTemplate(): TemplateResult {
      return html` <span class="sbb-button__icon"> ${this.renderIcon()} </span> `;
    }
  }
  return SbbMiniButtonCommonElement as unknown as AbstractConstructor<SbbMiniButtonCommonElementMixinType> &
    T;
};
