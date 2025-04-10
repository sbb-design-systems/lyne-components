import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

//use global stylesheet from seat-reservation-graphical-element
import style from './seat-reservation-graphical-element.scss?lit&inline';

/**
 * Wrapper class for a table cell in seat-reservation.
 */
export
@customElement('sbb-seat-reservation-table-cell')
class SbbSeatReservationTableCellElement extends LitElement {
  public static override styles: CSSResultGroup = style;

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

  @forceType()
  @property({ attribute: 'cell-id', type: String })
  public accessor cellId: string = '';

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
    return html`<td
      id="${this.cellId}"
      class="sbb-seat-reservation__graphical-element"
      role="gridcell"
    >
      <slot></slot>
    </td>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-table-cell': SbbSeatReservationTableCellElement;
  }
}
