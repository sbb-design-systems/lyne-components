import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { type AreaBackgroundState, type ElementMounting } from '../seat-reservation.js';

import style from './seat-reservation-area.scss?lit&inline';

/**
 * Visualize an area with a special meaning within a wagon.
 */
export
@customElement('sbb-seat-reservation-area')
class SbbSeatReservationAreaElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Mounting Prop */
  @forceType()
  @property({ attribute: 'mounting' })
  public accessor mounting: ElementMounting = 'FREE';

  /** the background of the area */
  @forceType()
  @property({ attribute: 'background' })
  public accessor background: AreaBackgroundState = 'LIGHT';

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-area': SbbSeatReservationAreaElement;
  }
}
