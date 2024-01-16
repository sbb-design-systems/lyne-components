import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor } from '..';
import { isValidAttribute } from '../../dom';

export declare class SbbButtonNegativeInterface {
  public negative: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonDisabledMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbButtonNegativeInterface> & T => {
  class SbbButtonDisabled extends superClass implements Partial<SbbButtonNegativeInterface> {
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
  return SbbButtonDisabled as unknown as Constructor<SbbButtonNegativeInterface> & T;
};

export declare class SbbButtonIconNameInterface {
  public iconName?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonIconNameMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbButtonIconNameInterface> & T => {
  class SbbButtonIconName extends superClass implements Partial<SbbButtonIconNameInterface> {
    /**
     * The icon name we want to use, choose from the small icon variants
     * from the ui-icons category from here
     * https://icons.app.sbb.ch.
     */
    @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;
  }
  return SbbButtonIconName as unknown as Constructor<SbbButtonIconNameInterface> & T;
};
