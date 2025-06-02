import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
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

  /** Rotation in degrees (without unit) */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

  /** Width of the area in pixels (without unit) */
  @forceType()
  @property({ attribute: 'width', type: Number })
  public accessor width: number = 6;

  /** Height of the area in pixels (without unit) */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = 6;

  /** Mounting Prop */
  @forceType()
  @property({ attribute: 'mounting' })
  public accessor mounting: ElementMounting = 'FREE';

  /** the background of the area */
  @forceType()
  @property({ attribute: 'background' })
  public accessor background: AreaBackgroundState = 'LIGHT';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('width')) {
      this.style?.setProperty('--sbb-reservation-area-width', `${this.width}`);
    }
    if (changedProperties.has('height')) {
      this.style?.setProperty('--sbb-reservation-area-height', `${this.height}`);
    }
    if (changedProperties.has('rotation')) {
      this.style?.setProperty('--sbb-reservation-area-rotation', `${this.rotation}`);
    }
  }

  protected override render(): TemplateResult {
    return html`<span class="sbb-sr-area"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-area': SbbSeatReservationAreaElement;
  }
}
