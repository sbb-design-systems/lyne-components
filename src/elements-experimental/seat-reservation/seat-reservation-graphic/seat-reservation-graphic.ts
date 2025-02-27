import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { mapCodeToSvg } from '../helper.js';

import style from './seat-reservation-graphic.scss?lit&inline';

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
  @property({ attribute: 'name', type: String })
  public accessor name: string = 'BISTRO';

  /** Stretch Prop */
  @forceType()
  @property({ attribute: 'stretch', type: Boolean })
  public accessor stretch: boolean = false;

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

  /** Width Prop */
  @forceType()
  @property({ attribute: 'width', type: Number })
  public accessor width: number = 2;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = 2;

  private _getSvgElement(code: string, stretch: boolean): Element | null {
    const parser = new DOMParser();
    const svgString = mapCodeToSvg[code] || '<svg></svg>';
    const svgElm = parser.parseFromString(svgString, 'image/svg+xml').firstElementChild;
    if (stretch && svgElm?.nodeName.toLowerCase() === 'svg') {
      svgElm.setAttribute('preserveAspectRatio', 'none');
    }
    return svgElm;
  }

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
    const stretch: boolean = this.stretch;

    return html`
      <span class="sbb-seat-reservation-graphic">${this._getSvgElement(name, stretch)}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-graphic': SbbSeatReservationGraphicElement;
  }
}
