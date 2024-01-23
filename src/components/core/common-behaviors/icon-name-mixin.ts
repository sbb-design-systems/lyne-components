import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { Constructor } from './constructor';

export declare class SbbIconNameInterface {
  public iconName: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbIconNameMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbIconNameInterface> & T => {
  class SbbIconName extends superClass implements Partial<SbbIconNameInterface> {
    /**
     * The icon name we want to use, choose from the small icon variants
     * from the ui-icons category from here
     * https://icons.app.sbb.ch.
     */
    @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;
  }

  return SbbIconName as Constructor<SbbIconNameInterface> & T;
};
