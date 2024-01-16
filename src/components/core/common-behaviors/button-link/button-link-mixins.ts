import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor } from '..';
import { isValidAttribute } from '../../dom';

export declare class SbbNegativeInterface {
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbNegativeMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbNegativeInterface> & T => {
  class SbbNegative extends superClass implements Partial<SbbNegativeInterface> {
    /** Negative coloring variant flag. */
    @property({ reflect: true, type: Boolean }) public negative = false;

    public override connectedCallback(): void {
      super.connectedCallback();
      // Check if the current element is nested in an action element.
      const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
      if (formField) {
        this.negative = isValidAttribute(formField, 'negative');
      }
    }
  }
  return SbbNegative as unknown as Constructor<SbbNegativeInterface> & T;
};

export declare class SbbIconNameInterface {
  public iconName?: string;
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
  return SbbIconName as unknown as Constructor<SbbIconNameInterface> & T;
};
