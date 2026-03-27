import { SbbElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { html, unsafeCSS } from 'lit';

import style from './seat-reservation-scoped.scss?inline';

/**
 * Wrapper class for scoped elements with similar properties to set.
 */
export class SbbSeatReservationScopedElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-seat-reservation-scoped';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

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
