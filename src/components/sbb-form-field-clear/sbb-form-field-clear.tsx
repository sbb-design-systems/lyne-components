import { ButtonProperties, resolveButtonRenderVariables } from '../core/interfaces';
import { hostContext, isValidAttribute } from '../core/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  documentLanguage,
  languageChangeHandlerAspect,
  ConnectedAbortController,
} from '../core/eventing';
import { i18nClearInput } from '../core/i18n';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { setAttribute, setAttributes } from '../core/dom';
import { SbbFormField } from '../sbb-form-field';
import style from './sbb-form-field-clear.scss?lit&inline';
import '../sbb-icon';

@customElement('sbb-form-field-clear')
export class SbbFormFieldClear extends LitElement {
  public static override styles: CSSResult = style;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  @state() private _currentLanguage = documentLanguage();

  private _handlerRepository = new HandlerRepository(
    this,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );
  private _formField: SbbFormField;
  private _abort = new ConnectedAbortController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._handlerRepository.connect();
    this._formField =
      (hostContext('sbb-form-field', this) as SbbFormField) ??
      (hostContext('[data-form-field]', this) as SbbFormField);

    if (this._formField) {
      this.negative = isValidAttribute(this._formField, 'negative');
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private async _handleClick(): Promise<void> {
    const input = await this._formField.getInputElement();
    if (!input || input.tagName !== 'INPUT') {
      return;
    }
    await this._formField.clear();
    input.focus();
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
  }

  protected override render(): TemplateResult {
    const { hostAttributes } = resolveButtonRenderVariables(this as ButtonProperties);

    setAttributes(this, hostAttributes);
    setAttribute(this, 'slot', 'suffix');
    setAttribute(this, 'aria-label', i18nClearInput[this._currentLanguage]);

    return html`
      <span class="sbb-form-field-clear">
        <sbb-icon name="cross-small"></sbb-icon>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field-clear': SbbFormFieldClear;
  }
}
