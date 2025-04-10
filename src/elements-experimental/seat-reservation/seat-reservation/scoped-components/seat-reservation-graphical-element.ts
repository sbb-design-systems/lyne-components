import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './seat-reservation-graphical-element.scss?lit&inline';

/**
 * Wrapper class for graphic elements in the seat-reservation.
 */
export
@customElement('sbb-seat-reservation-graphical-element')
class SbbSeatReservationGraphicalElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  @forceType()
  @property({ attribute: 'graph-elem-aria-label', type: String })
  public accessor graphElemAriaLabel: string = '';

  @forceType()
  @property({ attribute: 'inset-block-start', type: String })
  public accessor insetBlockStart: string = '';

  @forceType()
  @property({ attribute: 'inset-inline-start', type: String })
  public accessor insetInlineStart: string = '';

  @forceType()
  @property({ attribute: 'width', type: String })
  public accessor width: string = '';

  @forceType()
  @property({ attribute: 'height', type: String })
  public accessor height: string = '';

  @forceType()
  @property({ attribute: 'z-index', type: String })
  public accessor zIndex: string = '';

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    if (_changedProperties.has('width')) {
      this.style?.setProperty('--sbb-seat-reservation-graphical-element-width', `${this.width}`);
    }

    if (_changedProperties.has('height')) {
      this.style?.setProperty('--sbb-seat-reservation-graphical-element-height', `${this.height}`);
    }

    if (_changedProperties.has('insetBlockStart')) {
      this.style?.setProperty(
        '--sbb-seat-reservation-graphical-element-inset-block-start',
        `${this.insetBlockStart}`,
      );
    }

    if (_changedProperties.has('insetInlineStart')) {
      this.style?.setProperty(
        '--sbb-seat-reservation-graphical-element-inset-inline-start',
        `${this.insetInlineStart}`,
      );
    }

    if (_changedProperties.has('zIndex')) {
      this.style?.setProperty('--sbb-seat-reservation-graphical-element-z-index', `${this.zIndex}`);
    }
  }

  protected override render(): TemplateResult {
    return html`<div
      class="sbb-seat-reservation__graphical-element"
      title="${this.graphElemAriaLabel || nothing}"
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-graphical-element': SbbSeatReservationGraphicalElement;
  }
}
