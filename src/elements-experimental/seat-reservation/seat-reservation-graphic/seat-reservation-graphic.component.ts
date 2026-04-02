import { SbbElement } from '@sbb-esta/lyne-elements/core/base-elements.js';
import { SbbLanguageController } from '@sbb-esta/lyne-elements/core/controllers.js';
import { forceType } from '@sbb-esta/lyne-elements/core/decorators.js';
import { boxSizingStyles } from '@sbb-esta/lyne-elements/core/styles.js';
import { type CSSResultGroup, html, isServer, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { mapIconToSvg } from '../common/mapper.ts';
import { getI18nSeatReservation } from '../common/translations.ts';

import style from './seat-reservation-graphic.scss?inline';

import '@sbb-esta/lyne-elements/icon.js';

/**
 * Output one of the SVG graphics based on its code.
 */
export class SbbSeatReservationGraphicElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-seat-reservation-graphic';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /** Name of the SVG graphic to be displayed. */
  @forceType()
  @property({ attribute: 'name' })
  public accessor name: string = '';

  /** if true, scale the graphic content of the given element non-uniformly if necessary */
  @forceType()
  @property({ attribute: 'stretch', type: Boolean })
  public accessor stretch: boolean = false;

  private _language = new SbbLanguageController(this);

  protected override render(): TemplateResult | null {
    const svgObj = mapIconToSvg[this.name];

    if (!svgObj?.svg && !svgObj?.svgName) {
      return null;
    }

    return html`<span
      class="${classMap({
        'sbb-sr-icon': !!svgObj.svgName,
        'sbb-sr-graphic': !!svgObj.svg,
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
    if (!isServer) {
      const parser = new DOMParser();
      const svgString = svg || '<svg></svg>';
      const svgElm = parser.parseFromString(svgString, 'image/svg+xml').firstElementChild;
      if (this.stretch && svgElm?.nodeName.toLowerCase() === 'svg') {
        svgElm.setAttribute('preserveAspectRatio', 'none');
      }
      return svgElm;
    }

    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-graphic': SbbSeatReservationGraphicElement;
  }
}
