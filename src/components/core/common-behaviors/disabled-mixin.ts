import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor } from './constructor';

export declare class SbbDisabledInterface {
  public disabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbDisabledInterface> & T => {
  class SbbDisabled extends superClass implements Partial<SbbDisabledInterface> {
    /** Whether the button is disabled. */
    @property({ reflect: true, type: Boolean }) public disabled?: boolean = false;
  }

  return SbbDisabled as Constructor<SbbDisabledInterface> & T;
};
