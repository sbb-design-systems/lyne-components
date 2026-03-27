import { SbbElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import type { CSSResultGroup, TemplateResult, unsafeCSS } from 'lit';
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import style from './seat-reservation-area.scss?inline';

/**
 * Visualize an area with a special meaning within a wagon.
 */
export class SbbSeatReservationAreaElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-seat-reservation-area';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

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
