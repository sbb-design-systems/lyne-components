import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getI18nSeatReservation, mapIconToSvg } from '../common.js';

import style from './seat-reservation-graphic.scss?lit&inline';

import '@sbb-esta/lyne-elements/icon.js';

/**
 * Output one of the SVG graphics based on its code.
 */
export
@customElement('sbb-seat-reservation-graphic')
class SbbSeatReservationGraphicElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Name Prop */
  @forceType()
  @property({ attribute: 'name', type: String })
  public accessor name: string = '';

  @forceType()
  /** Stretch Prop */
  @property({ attribute: 'stretch', type: Boolean })
  public accessor stretch: boolean = false;

  /** Rotation Prop */
  @forceType()
  @property({ attribute: 'rotation', type: Number })
  public accessor rotation: number = 0;

  /** Width Prop */
  @forceType()
  @property({ attribute: 'width', type: Number })
  public accessor width: number = null!;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = null!;

  private _language = new SbbLanguageController(this);

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('width') && !!this.width) {
      this.style?.setProperty('--sbb-reservation-graphic-width', `${this.width}`);
    }

    if (_changedProperties.has('height') && !!this.height) {
      this.style?.setProperty('--sbb-reservation-graphic-height', `${this.height}`);
    }

    if (_changedProperties.has('rotation')) {
      this.style?.setProperty('--sbb-reservation-graphic-rotation', `${this.rotation}`);
    }
  }

  protected override render(): TemplateResult {
    const svgObj = mapIconToSvg[this.name];

    return html`
      ${svgObj?.svgName
        ? html` <span class="sbb-seat-reservation-icon">
            <sbb-icon
              class="sbb-icon-fit sbb-seat-reservation-icon"
              name="${svgObj.svgName || ''}"
              aria-hidden="false"
              aria-label="${getI18nSeatReservation(svgObj.svgName, this._language.current)}"
            ></sbb-icon>
          </span>`
        : svgObj?.svg
          ? html`
              <span class="sbb-seat-reservation-graphic">${this._getSvgElement(svgObj.svg)}</span>
            `
          : nothing}
    `;
  }

  private _getSvgElement(svg: string): Element | null {
    const parser = new DOMParser();
    const svgString = svg || '<svg></svg>';
    const svgElm = parser.parseFromString(svgString, 'image/svg+xml').firstElementChild;
    if (this.stretch && svgElm?.nodeName.toLowerCase() === 'svg') {
      svgElm.setAttribute('preserveAspectRatio', 'none');
    }
    return svgElm;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-graphic': SbbSeatReservationGraphicElement;
  }
}
