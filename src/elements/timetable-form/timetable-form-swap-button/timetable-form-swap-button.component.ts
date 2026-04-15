import { unsafeCSS, type CSSResultGroup, type PropertyValues } from 'lit';

import { SbbSecondaryButtonElement } from '../../button.pure.ts';
import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nTimetableFormSwapButtonLabel } from '../../core/i18n.ts';

import style from './timetable-form-swap-button.scss?inline';

// TODO(breaking-change): Remove call to define.
SbbSecondaryButtonElement.define();

/**
 * An extension of `sbb-secondary-button` to be used inside the `sbb-timetable-form`.
 * When placed between two `sbb-timetable-form-field`, the 'click' swaps the value of the sibling inputs.
 *
 * @event {Event} change - The change event is fired on the associated inputs when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
 * @event {InputEvent} input - The input event fires on the associated inputs when the value has been changed as a direct result of a user action.
 */
export class SbbTimetableFormSwapButtonElement extends SbbSecondaryButtonElement {
  public static override readonly elementName: string = 'sbb-timetable-form-swap-button';
  public static override styles: CSSResultGroup = [
    SbbSecondaryButtonElement.styles,
    unsafeCSS(style),
  ];

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
