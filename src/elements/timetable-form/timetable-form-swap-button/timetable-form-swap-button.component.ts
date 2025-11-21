import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbSecondaryButtonElement } from '../../button/secondary-button.ts';
import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nTimetableFormSwapButtonLabel } from '../../core/i18n.ts';

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
    this.addEventListener('click', () => this._invertFieldValues());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleState('timetable-form-context', !!this.closest('sbb-timetable-form'));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.internals.ariaLabel = i18nTimetableFormSwapButtonLabel[this._languageController.current];
  }

  /**
   * Search for `sbb-timetable-form-field` inputs, invert their values and dispatch the respective input and change events
   */
  private _invertFieldValues(): void {
    const parentForm = this.closest('sbb-timetable-form');
    const fields = Array.from(parentForm?.querySelectorAll('sbb-timetable-form-field') || []);
    const values = fields.map((f) => (f.inputElement as HTMLInputElement)?.value);
    if (!parentForm || values.length === 0 || values.every((v) => !v)) {
      return;
    }

    values.reverse().forEach((v, i) => {
      const input = fields[i].inputElement;
      if (input instanceof HTMLInputElement) {
        input.value = v;
        input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  protected override renderIconName(): string {
    return super.renderIconName() || 'arrow-change-small';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-form-swap-button': SbbTimetableFormSwapButtonElement;
  }
}
