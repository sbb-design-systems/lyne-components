import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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

  /** Inverse rotation for part of an SVG that can be rotated opposite to the normal rotation */
  @forceType()
  @property({ attribute: 'inverse-roration', type: Number })
  public accessor inverseRotation: number = 0;

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

    if (_changedProperties.has('inverseRotation')) {
      this.style?.setProperty(
        '--sbb-reservation-graphic-inverse-rotation',
        `${this.inverseRotation}`,
      );
    }
  }

  protected override render(): TemplateResult | null {
    const svgObj = mapIconToSvg[this.name];

    if (!svgObj?.svg && !svgObj?.svgName) {
      return null;
    }

    return html`<span
      class="${classMap({
        'sbb-seat-reservation-icon': !!svgObj.svgName,
        'sbb-seat-reservation-graphic': !!svgObj.svg,
      })}"
    >
      ${svgObj.svgName
        ? html` <sbb-icon
            name="${svgObj.svgName || ''}"
            aria-hidden="false"
            aria-label="${getI18nSeatReservation(svgObj.svgName, this._language.current)}"
          ></sbb-icon>`
        : html`${this._getSvgElement(svgObj.svg!)}`}
    </span>`;
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
