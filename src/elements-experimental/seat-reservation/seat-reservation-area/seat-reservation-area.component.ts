import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './seat-reservation-area.scss?lit&inline';

/**
 * Visualize an area with a special meaning within a wagon.
 */
export
@customElement('sbb-seat-reservation-area')
class SbbSeatReservationAreaElement extends LitElement {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Mounting Prop */
  @forceType()
  @property({ reflect: true })
  public accessor mounting: 'free' | 'upper-border' | 'lower-border' | 'upper-to-lower-border' =
    'free';

  /** the background of the area */
  @forceType()
  @property({ reflect: true })
  public accessor background: 'light' | 'dark' = 'light';

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
