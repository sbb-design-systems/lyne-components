import { type CSSResultGroup, html, type LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type {
  AbstractConstructor,
  SbbDisabledMixinType,
  SbbIconNameMixinType,
  SbbNegativeMixinType,
} from '../../core/common-behaviors';
import {
  SbbDisabledMixin,
  SbbIconNameMixin,
  SbbNegativeMixin,
  NamedSlotStateController,
} from '../../core/common-behaviors';
import { actionElementHandlerAspect, HandlerRepository } from '../../core/eventing';
import type { SbbIconPlacement } from '../../core/interfaces';

import '../../icon';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, SbbIconNameMixinType
{
  public variant: 'block' | 'inline';
  public size?: SbbLinkSize;
  public disabled: boolean;
  public iconName: string;
  public negative: boolean;
  public renderIconSlot(): TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(SbbDisabledMixin(SbbIconNameMixin(superClass)))
    implements Partial<SbbLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Variant of the link (block or inline). */
    @property({ reflect: true }) public variant: 'block' | 'inline' = 'block';

    /**
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
     */
    @property({ reflect: true }) public size: SbbLinkSize = 's';

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement' })
    public iconPlacement?: SbbIconPlacement = 'start';

    private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

    protected constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this._handlerRepository.connect();
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }

    public override renderIconSlot(): TemplateResult {
      return html` <span class="sbb-link__icon"> ${super.renderIconSlot()} </span> `;
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
