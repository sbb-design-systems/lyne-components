import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { type ElementMounting } from '../seat-reservation.js';

import style from './seat-reservation-area.scss?lit&inline';

/**
 * Visualize an area with a special meaning within a wagon.
 */
export
@customElement('sbb-seat-reservation-area')
class SbbSeatReservationAreaElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

  /** Width Prop */
  @forceType()
  @property({ attribute: 'width', type: Number })
  public accessor width: number = 6;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = 6;

  /** Mounting Prop */
  @forceType()
  @property({ attribute: 'mounting', type: String })
  public accessor mounting: ElementMounting = 'FREE';

  /** Background Prop */
  @forceType()
  @property({ attribute: 'background', type: String })
  public accessor background: 'light' | 'dark' = 'light';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('width')) {
      this.style?.setProperty('--area-width-from-host', `${this.width}`);
    }
    if (changedProperties.has('height')) {
      this.style?.setProperty('--area-height-from-host', `${this.height}`);
    }
    if (changedProperties.has('rotation')) {
      this.style?.setProperty('--area-rotation-from-host', `${this.rotation}`);
    }
  }

  protected override render(): TemplateResult {
    return html` <span class="sbb-seat-reservation-area"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-area': SbbSeatReservationAreaElement;
  }
}
