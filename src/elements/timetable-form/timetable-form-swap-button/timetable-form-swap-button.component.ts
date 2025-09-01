import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSecondaryButtonElement } from '../../button/secondary-button.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { i18nTimetableFormSwapButtonLabel } from '../../core/i18n.js';
import type { SbbTimetableFormFieldElement } from '../timetable-form-field.js';

import style from './timetable-form-swap-button.scss?lit&inline';

/**
 * An extension of `sbb-secondary-button` to be used inside the `sbb-timetable-form`.
 * When placed between two `sbb-timetable-form-field`, the 'click' swaps the value of the sibling inputs.
 */
export
@customElement('sbb-timetable-form-swap-button')
class SbbTimetableFormSwapButtonElement extends SbbSecondaryButtonElement {
  public static override styles: CSSResultGroup = [SbbSecondaryButtonElement.styles, style];

  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.iconName = 'arrow-change-small';
    this.addEventListener('click', () => this._swapSiblingsFieldValues());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleState('timetable-form', !!this.closest('sbb-timetable-form'));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.internals.ariaLabel = i18nTimetableFormSwapButtonLabel[this._languageController.current];
  }

  /**
   * If the swap-button is between two `sbb-timetable-form-field`, clicking it swaps the field values and dispatch the respective input and change events
   */
  private _swapSiblingsFieldValues(): void {
    if (
      this.previousElementSibling?.localName !== 'sbb-timetable-form-field' ||
      this.nextElementSibling?.localName !== 'sbb-timetable-form-field'
    ) {
      return;
    }

    const prevInput = (this.previousElementSibling as SbbTimetableFormFieldElement).inputElement;
    const nextInput = (this.nextElementSibling as SbbTimetableFormFieldElement).inputElement;

    if (
      prevInput instanceof HTMLInputElement &&
      nextInput instanceof HTMLInputElement &&
      (prevInput.value || nextInput.value)
    ) {
      const value = prevInput.value;
      prevInput.value = nextInput.value;
      nextInput.value = value;

      prevInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      nextInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      prevInput.dispatchEvent(new Event('change', { bubbles: true }));
      nextInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-form-swap-button': SbbTimetableFormSwapButtonElement;
  }
}
