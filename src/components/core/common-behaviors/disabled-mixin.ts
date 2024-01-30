import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor';

export declare class SbbDisabledMixinType {
  public disabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDisabledMixinType> & T => {
  abstract class SbbDisabled extends superClass implements Partial<SbbDisabledMixinType> {
    /** Whether the button is disabled. */
    @property({ reflect: true, type: Boolean }) public disabled?: boolean = false;
  }

  return SbbDisabled as AbstractConstructor<SbbDisabledMixinType> & T;
};
