import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor } from '..';

export declare class SbbNegativeInterface {
  public negative: boolean;
}

export declare class SbbDisabledInterface {
  public disabled: boolean;
}

export declare class SbbIconNameInterface {
  public iconName: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNegativeMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbNegativeInterface> & T => {
  class SbbNegative extends superClass implements Partial<SbbNegativeInterface> {
    /** Negative coloring variant flag. */
    @property({ reflect: true, type: Boolean }) public negative = false;
  }
  return SbbNegative as unknown as Constructor<SbbNegativeInterface> & T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDisabledMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbDisabledInterface> & T => {
  class SbbDisabled extends superClass implements Partial<SbbDisabledInterface> {
    /** Whether the button is disabled. */
    @property({ reflect: true, type: Boolean }) public disabled?: boolean = false;
  }
  return SbbDisabled as unknown as Constructor<SbbDisabledInterface> & T;
};

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
  return SbbIconName as unknown as Constructor<SbbIconNameInterface> & T;
};
