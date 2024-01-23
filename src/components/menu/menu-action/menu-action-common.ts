import type { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { Constructor } from '../../core/common-behaviors';
import { actionElementHandlerAspect, HandlerRepository } from '../../core/eventing';

import style from './menu-action.scss?lit&inline';

export declare class SbbMenuActionCommonInterface {
  public amount: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbMenuActionCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbMenuActionCommonInterface> & T => {
  class SbbMenuActionCommonElement
    extends superClass
    implements Partial<SbbMenuActionCommonInterface>
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
  return SbbMenuActionCommonElement as unknown as Constructor<SbbMenuActionCommonInterface> & T;
};
