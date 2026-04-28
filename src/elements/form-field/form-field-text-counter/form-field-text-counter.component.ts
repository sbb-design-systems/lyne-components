import type { CSSResultGroup, TemplateResult } from 'lit';
import { html } from 'lit';
import { state } from 'lit/decorators.js';

import { i18nRemainingCharacters, SbbLanguageController, sbbLiveAnnouncer } from '../../core.ts';
import { SbbHintElement } from '../hint/hint.component.ts';

const percentagesToRead = [100, 50, 25, 10, 0];

/**
 * It displays the remaining characters count for input/textarea elements with a configured
 * maxlength property in the `sbb-form-field`.
 * The component automatically uses the form field's inputElement and displays the remaining character count.
 * If the input is disabled, readonly or an `sbb-error` is present, the output is suppressed.
 * @slot - Use the unnamed slot to display a custom description text after the counter.
 */
export class SbbFormFieldTextCounterElement extends SbbHintElement {
  public static override readonly elementName: string = 'sbb-form-field-text-counter';
  public static override styles: CSSResultGroup = [super.styles];

  @state() private accessor _remainingCharacters: number = 0;

  private _language = new SbbLanguageController(this);
  private _abortController: AbortController | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();

    this.internals.ariaHidden = 'true';

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
      this.formField.addEventListener(
        'focusin',
        (event) => {
          // We update the aria-label on focus to ensure that screen readers announce the remaining characters when the user focuses the input.
          if (event.target === this.formField?.inputElement) {
            this.internals.ariaLabel = this._infoText();
          }
        },
        {
          signal: this._abortController.signal,
        },
      );

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

    const maxLength = inputElement.maxLength ?? 0;
    const currentLength = inputElement.value?.length ?? 0;
    this._remainingCharacters = Math.max(maxLength - currentLength, 0);

    if (
      [...percentagesToRead.map((e) => Math.round((e / 100) * maxLength))].includes(
        this._remainingCharacters,
      )
    ) {
      sbbLiveAnnouncer.announce(this._infoText());
    }
  }

  private _infoText(): string {
    return `${this._remainingCharacters} ${i18nRemainingCharacters[this._language.current]}`;
  }

  protected override render(): TemplateResult {
    return html`${this._remainingCharacters}<slot>
        ${i18nRemainingCharacters[this._language.current]}</slot
      >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field-text-counter': SbbFormFieldTextCounterElement;
  }
}
