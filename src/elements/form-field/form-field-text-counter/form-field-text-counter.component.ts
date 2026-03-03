import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nRemainingCharacters } from '../../core/i18n.ts';
import { SbbElementInternalsMixin, SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbFormFieldElement } from '../form-field/form-field.component.ts';

import style from './form-field-text-counter.scss?lit&inline';

/**
 * It displays the remaining characters count for input/textarea elements with maxlength in the `sbb-form-field`.
 * The component automatically uses the form field's inputElement and displays the remaining character count.
 * If the input is disabled or readonly, the output is suppressed.
 * @slot - Use the unnamed slot to display a custom description text after the counter.
 */
export
@customElement('sbb-form-field-text-counter')
class SbbFormFieldTextCounterElement extends SbbNegativeMixin(
  SbbElementInternalsMixin(LitElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  @state() private accessor _remainingChars: number = 0;

  private _language = new SbbLanguageController(this);
  private _formField: SbbFormFieldElement | null = null;
  private _abortController = new AbortController();

  public override connectedCallback(): void {
    super.connectedCallback();

    this.slot ||= 'text-counter';

    this._abortController.abort();
    this._abortController = new AbortController();
    this._formField = this.closest('sbb-form-field');

    if (this._formField) {
      this.negative = this._formField.hasAttribute('negative');
      this._formField.addEventListener('ɵinput', () => this._onInputUpdate(), {
        signal: this._abortController.signal,
      });
      this._formField.addEventListener('input', () => this._onInputUpdate(), {
        signal: this._abortController.signal,
      });
      this._formField.addEventListener('ɵinputattributechange', () => this._onInputUpdate(), {
        signal: this._abortController.signal,
      });

      this._onInputUpdate();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._abortController.abort();
  }

  private _onInputUpdate(): void {
    const inputElement = this._formField?.inputElement as
      | {
          maxLength?: number;
          value?: string;
        }
      | undefined;

    if (!inputElement) {
      return;
    }

    this._remainingChars = Math.max(
      (inputElement.maxLength ?? 0) - (inputElement.value?.length ?? 0),
      0,
    );
  }

  protected override render(): TemplateResult {
    return html`${this._remainingChars}<slot>
        ${i18nRemainingCharacters[this._language.current]}
      </slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field-text-counter': SbbFormFieldTextCounterElement;
  }
}
