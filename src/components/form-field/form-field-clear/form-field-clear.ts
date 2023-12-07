import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { LanguageController } from '../../core/common-behaviors';
import { hostContext, isValidAttribute, setAttribute, setAttributes } from '../../core/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  ConnectedAbortController,
} from '../../core/eventing';
import { i18nClearInput } from '../../core/i18n';
import { ButtonProperties, resolveButtonRenderVariables } from '../../core/interfaces';
import type { SbbFormFieldElement } from '../form-field';
import '../../icon';

import style from './form-field-clear.scss?lit&inline';

/**
 * Combined with `sbb-form-field`, it displays a button which clears the input value.
 */
@customElement('sbb-form-field-clear')
export class SbbFormFieldClearElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);
  private _formField: SbbFormFieldElement;
  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this, this._abort);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._handlerRepository.connect();
    this._formField =
      (hostContext('sbb-form-field', this) as SbbFormFieldElement) ??
      (hostContext('[data-form-field]', this) as SbbFormFieldElement);

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
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  protected override render(): TemplateResult {
    const { hostAttributes } = resolveButtonRenderVariables(this as ButtonProperties);

    setAttributes(this, hostAttributes);
    setAttribute(this, 'slot', 'suffix');
    setAttribute(this, 'aria-label', i18nClearInput[this._language.current]);

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
    'sbb-form-field-clear': SbbFormFieldClearElement;
  }
}
