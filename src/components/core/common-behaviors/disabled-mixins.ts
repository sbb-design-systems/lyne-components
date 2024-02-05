import type { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor';

export declare class SbbDisabledMixinType {
  public disabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbDisabled extends superClass implements SbbDisabledMixinType {
    /** Whether the component is disabled. */
    @property({ reflect: true, type: Boolean }) public disabled: boolean = false;
  }

  return SbbDisabled as AbstractConstructor<SbbDisabledMixinType> & T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledTabIndexActionMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbDisabledTabIndexAction
    extends SbbDisabledMixin(superClass)
    implements SbbDisabledMixinType
  {
    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (!changedProperties.has('disabled')) {
        return;
      }

      // FIXME verify if tabindex is ALWAYS used with disabled
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
        this.removeAttribute('tabindex');
      } else {
        this.removeAttribute('aria-disabled');
        this.setAttribute('tabindex', '0');
      }
    }
  }
  return SbbDisabledTabIndexAction as AbstractConstructor<SbbDisabledMixinType> & T;
};
