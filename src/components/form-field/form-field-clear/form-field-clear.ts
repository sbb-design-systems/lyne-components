import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbMiniButtonElement } from '../../button';
import {
  hostAttributes,
  LanguageController,
  SbbButtonBaseElement,
  SbbNegativeMixin,
} from '../../core/common-behaviors';
import { hostContext } from '../../core/dom';
import { ConnectedAbortController } from '../../core/eventing';
import { i18nClearInput } from '../../core/i18n';
import type { SbbFormFieldElement } from '../form-field';

import style from './form-field-clear.scss?lit&inline';
import '../../icon';

/**
 * Combined with `sbb-form-field`, it displays a button which clears the input value.
 */
@hostAttributes({
  slot: 'suffix',
})
@customElement('sbb-form-field-clear')
export class SbbFormFieldClearElement extends SbbNegativeMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = [SbbMiniButtonElement.styles, style];

  private _formField?: SbbFormFieldElement;
  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._formField =
      (hostContext('sbb-form-field', this) as SbbFormFieldElement) ??
      (hostContext('[data-form-field]', this) as SbbFormFieldElement);
  }

  private async _handleClick(): Promise<void> {
    const input = this._formField?.inputElement;
    if (!input || input.tagName !== 'INPUT') {
      return;
    }
    this._formField?.clear();
    input.focus();
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.setAttribute('aria-label', i18nClearInput[this._language.current]);
  }

  protected override renderTemplate(): TemplateResult {
    return html` <sbb-icon name="cross-small"></sbb-icon> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field-clear': SbbFormFieldClearElement;
  }
}
