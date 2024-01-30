import type { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { AbstractConstructor } from './constructor';

export declare class SbbIconNameMixinType {
  public iconName: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbIconNameMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbIconNameMixinType> & T => {
  abstract class SbbIconName extends superClass implements Partial<SbbIconNameMixinType> {
    /**
     * The icon name we want to use, choose from the small icon variants
     * from the ui-icons category from here
     * https://icons.app.sbb.ch.
     */
    @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;
  }

  return SbbIconName as AbstractConstructor<SbbIconNameMixinType> & T;
};
