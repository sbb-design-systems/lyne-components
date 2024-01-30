import type { CSSResultGroup, LitElement } from 'lit';
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
import { ACTION_ELEMENTS, hostContext } from '../../core/dom';
import { actionElementHandlerAspect, HandlerRepository } from '../../core/eventing';
import type { IsStaticProperty, SbbIconPlacement } from '../../core/interfaces';

import '../../icon';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonElementMixinType
  implements SbbNegativeMixinType, SbbDisabledMixinType, SbbIconNameMixinType
{
  public variant: 'block' | 'inline';
  public size?: SbbLinkSize;
  public isStatic: boolean;
  public disabled: boolean;
  public iconName: string;
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(SbbDisabledMixin(SbbIconNameMixin(superClass)))
    implements Partial<SbbLinkCommonElementMixinType>, IsStaticProperty
  {
    public static styles: CSSResultGroup = style;

    /** Variant of the link (block or inline). */
    @property({ reflect: true }) public variant: 'block' | 'inline' = 'block';

    /**
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
     */
    @property({ reflect: true }) public size: SbbLinkSize = 's';

    /**
     * Set this property to true if you want only a visual representation of a
     * link, but no interaction (a span instead of a link/button will be rendered).
     */
    @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement' })
    public iconPlacement?: SbbIconPlacement = 'start';

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
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
