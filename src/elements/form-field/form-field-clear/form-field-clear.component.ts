import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { miniButtonStyle } from '../../button/common.ts';
import { SbbButtonBaseElement } from '../../core/base-elements.ts';
import { SbbLanguageController } from '../../core/controllers.ts';
import { i18nClearInput } from '../../core/i18n.ts';
import { SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbFormFieldElement } from '../form-field.ts';

import '../../icon.ts';

/**
 * Combined with `sbb-form-field`, it displays a button which clears the input value.
 */
export
@customElement('sbb-form-field-clear')
class SbbFormFieldClearElement extends SbbNegativeMixin(SbbButtonBaseElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, miniButtonStyle];

  private _formField?: SbbFormFieldElement | null;
  private _language = new SbbLanguageController(this);

  public constructor() {
    super();
    this.addEventListener?.('click', () => this._handleClick());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._formField = this.closest<SbbFormFieldElement>('sbb-form-field');

    if (this._formField) {
      this.slot ||= 'suffix';
      this.negative = this._formField.hasAttribute('negative');
    }
  }

  private async _handleClick(): Promise<void> {
    const input = this._formField?.inputElement;
    if (!input || input.localName !== 'input') {
      return;
    }
    this._formField?.clear();
    input.focus();
    input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.internals.ariaLabel = i18nClearInput[this._language.current];
  }

  protected override renderTemplate(): TemplateResult {
    return html`<sbb-icon name="cross-small"></sbb-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-field-clear': SbbFormFieldClearElement;
  }
}
