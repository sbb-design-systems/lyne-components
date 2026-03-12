import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { state } from 'lit/decorators.js';

import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nRemainingCharacters } from '../../core/i18n.ts';
import { SbbHintElement } from '../hint/hint.component.ts';

/**
 * It displays the remaining characters count for input/textarea elements with maxlength in the `sbb-form-field`.
 * The component automatically uses the form field's inputElement and displays the remaining character count.
 * If the input is disabled or readonly, the output is suppressed.
 * @slot - Use the unnamed slot to display a custom description text after the counter.
 */
export class SbbFormFieldTextCounterElement extends SbbHintElement {
  public static override readonly elementName: string = 'sbb-form-field-text-counter';
  public static override styles: CSSResultGroup = [SbbHintElement.styles];

  @state() private accessor _remainingChars: number = 0;

  private _language = new SbbLanguageController(this);
  private _abortController: AbortController | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();

    this._abortController?.abort();
    this._abortController = new AbortController();

    if (this.formField) {
      this.formField.addEventListener('ɵinput', () => this._onInputUpdate(), {
        signal: this._abortController.signal,
      });
      this.formField.addEventListener('input', () => this._onInputUpdate(), {
        signal: this._abortController.signal,
      });
      this.formField.addEventListener('ɵinputattributechange', () => this._onInputUpdate(), {
        signal: this._abortController.signal,
      });

      this._onInputUpdate();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._abortController?.abort();
  }

  private _onInputUpdate(): void {
    const inputElement = this.formField?.inputElement as
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
