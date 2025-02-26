import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
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
  public static override styles: CSSResultGroup = style;

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

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('width')) {
      this.style?.setProperty('--graphic-width-from-host', `${this.width}`);
    }
    if (changedProperties.has('height')) {
      this.style?.setProperty('--graphic-height-from-host', `${this.height}`);
    }
    if (changedProperties.has('rotation')) {
      this.style?.setProperty('--graphic-rotation-from-host', `${this.rotation}`);
    }
  }

  protected override render(): TemplateResult {
    const name: string = this.name;

    return html` <span class="sbb-seat-reservation-graphic">${unsafeHTML(getSVG(name))}</span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-graphic': SbbSeatReservationGraphicElement;
  }
}
