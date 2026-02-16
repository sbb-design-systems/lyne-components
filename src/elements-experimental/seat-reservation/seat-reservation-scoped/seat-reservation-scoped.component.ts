import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './seat-reservation-scoped.scss?lit&inline';

/**
 * Wrapper class for scoped elements with similar properties to set.
 */
export
@customElement('sbb-seat-reservation-scoped')
class SbbSeatReservationScopedElement extends LitElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-scoped': SbbSeatReservationScopedElement;
  }
}
