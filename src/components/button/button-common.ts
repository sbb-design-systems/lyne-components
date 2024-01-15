import { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor, LanguageController } from '../core/common-behaviors';
import { ACTION_ELEMENTS, hostContext, isValidAttribute, toggleDatasetEntry } from '../core/dom';
import {
  actionElementHandlerAspect,
  HandlerRepository,
} from '../core/eventing';

import style from './button.scss?lit&inline';

export type SbbButtonSize = 'l' | 'm';

export declare interface SbbButtonCommonInterface {
  variant: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  negative: boolean;
  size?: SbbButtonSize;
  iconName?: string;
  isStatic: boolean;
  language: LanguageController;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbButtonCommonInterface> & T => {
  class SbbButtonCommonElement extends superClass implements SbbButtonCommonInterface {
    public static styles: CSSResultGroup = style;
    /** Variant of the button, like primary, secondary etc. */
    @property({ reflect: true }) public variant:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'transparent' = 'primary';

    /** Negative coloring variant flag. */
    @property({ reflect: true, type: Boolean }) public negative = false;

    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    /**
     * Set this property to true if you want only a visual representation of a
     * button, but no interaction (a span instead of a link/button will be rendered).
     */
    @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;

  public language = new LanguageController(this);
  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this);
    this._handlerRepository.connect();

      const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
      if (formField) {
        toggleDatasetEntry(this, 'iconSmall', true);
        this.negative = isValidAttribute(formField, 'negative');
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }
  }
  return SbbButtonCommonElement as Constructor<SbbButtonCommonInterface> & T;
};
