import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { Constructor } from './constructor';

export declare class SbbNegativeMixinType {
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNegativeMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbNegativeMixinType> & T => {
  class SbbNegative extends superClass implements Partial<SbbNegativeMixinType> {
    /** Negative coloring variant flag. */
    @property({ reflect: true, type: Boolean }) public negative = false;
  }

  return SbbNegative as Constructor<SbbNegativeMixinType> & T;
};
