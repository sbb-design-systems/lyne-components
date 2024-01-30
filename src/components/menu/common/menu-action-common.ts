import type { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type {
  AbstractConstructor,
  SbbDisabledMixinType,
  SbbIconNameMixinType,
} from '../../core/common-behaviors';
import { SbbDisabledMixin, SbbIconNameMixin } from '../../core/common-behaviors';
import { actionElementHandlerAspect, HandlerRepository } from '../../core/eventing';

import style from './menu-action.scss?lit&inline';

export declare class SbbMenuActionCommonElementMixinType
  implements SbbDisabledMixinType, SbbIconNameMixinType
{
  public amount: string;
  public disabled: boolean;
  public iconName: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbMenuActionCommonElementMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbMenuActionCommonElementMixinType> & T => {
  abstract class SbbMenuActionCommonElement
    extends SbbIconNameMixin(SbbDisabledMixin(superClass))
    implements Partial<SbbMenuActionCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /** Value shown as badge at component end. */
    @property() public amount: string | undefined;

    private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

    public override connectedCallback(): void {
      super.connectedCallback();
      this._handlerRepository.connect();
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }
  }
  return SbbMenuActionCommonElement as unknown as AbstractConstructor<SbbMenuActionCommonElementMixinType> &
    T;
};
