import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers/language-controller';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, nothing, type TemplateResult } from 'lit';
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
  public accessor width: number = 2;

  /** Height Prop */
  @forceType()
  @property({ attribute: 'height', type: Number })
  public accessor height: number = 2;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult {
    const svgObj = mapIconToSvg[this.name];

    return html`
      ${svgObj?.svgName
        ? html`<sbb-icon
            name="${svgObj.svgName || ''}"
            aria-hidden="false"
            aria-label="${getI18nSeatReservation(svgObj.svgName, this._language.current)}"
          ></sbb-icon> `
        : svgObj?.svg
          ? html`
              <style>
                :host {
                  --graphic-width-from-host: ${this.width};
                  --graphic-height-from-host: ${this.height};
                  --graphic-rotation-from-host: ${this.rotation};
                }
              </style>
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
