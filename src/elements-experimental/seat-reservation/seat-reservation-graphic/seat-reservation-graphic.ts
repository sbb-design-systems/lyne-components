import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { TemplateResult } from 'lit';
import { html, css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { mapCodeToSvg } from '../helper.js';

import style from './seat-reservation-graphic.scss?lit&inline';

const getSVG = (code: string): string => {
  return mapCodeToSvg[code] || '<svg></svg>';
};

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 */
export
@customElement('sbb-seat-reservation-graphic')
class SbbSeatReservationGraphicElement extends LitElement {
  public static override styles = [
    css`
      :host {
        --svg-stroke-from-host: ${unsafeCSS(this.name)};
      }
    `,
    style,
  ];

  /** Name Prop */
  @forceType()
  @property({ attribute: 'name' })
  public accessor name: string = 'BISTRO';

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation' })
  public accessor rotation: number = 0;

  /** Width Prop */
  @forceType()
  @property({ attribute: 'width' })
  public accessor width: number = 2;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height' })
  public accessor height: number = 2;

  protected override render(): TemplateResult {
    const name: string = this.name;
    const width: number = this.width;
    const height: number = this.height;
    const rotation: number = this.rotation;

    return html`
      <style>
        :host {
          --graphic-rotation-from-host: ${unsafeCSS(rotation)};
          --graphic-width-from-host: ${unsafeCSS(width)};
          --graphic-height-from-host: ${unsafeCSS(height)};
        }
      </style>
      <span class="sbb-reservation-graphic"> ${unsafeHTML(getSVG(name))}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-graphic': SbbSeatReservationGraphicElement;
  }
}
