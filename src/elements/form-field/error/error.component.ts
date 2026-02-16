import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

import style from './error.scss?lit&inline';

let nextId = 0;

/**
 * It displays an error message in the `sbb-form-field`.
 *
 * @slot - Use this slot to display the error message.
 * @slot icon - Use this slot to override the default error icon.
 */
export
@customElement('sbb-error')
class SbbErrorElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-error-${nextId++}`;
    const formField = this.closest?.('sbb-form-field');
    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
  }

  protected override render(): TemplateResult {
    return html`
      <span class="error__icon">
        <slot name="icon">
          <svg
            class="error__icon-svg"
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="3" x2="7" y2="8.5" />
            <line x1="7" y1="10" x2="7" y2="11" />
            <circle cx="7" cy="7" r="6.5" />
          </svg>
        </slot>
      </span>
      <span class="error-content">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-error': SbbErrorElement;
  }
}
