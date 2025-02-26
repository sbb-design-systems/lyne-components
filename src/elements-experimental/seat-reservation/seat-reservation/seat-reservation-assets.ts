import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import * as assets from '../assets.js';
import { mapCodeToSvg } from '../helper.js';

import './seat-reservation-assets.scss';

const svgImage = (src: string): TemplateResult => {
  return html`
    <div class="story-asset">
      <span class="story-asset__preview">${unsafeHTML(src)}</span>
    </div>
  `;
};

const svgTmpImage = (src: string, variant: 'light' | 'dark' = 'light'): TemplateResult => {
  return html`
    <div class="story-asset">
      <p class="story-asset__hint">temporäre Ansicht ... per CSS erstellen</p>
      <span class="story-asset__preview story-asset__preview--tmp story-asset__preview--${variant}"
        >${unsafeHTML(src)}</span
      >
    </div>
  `;
};

/**
 * svgImageByOSDMCode Function returns the corresponding svg image by OSDM Code
 * @param osdmCode
 * @param alt
 * @param title
 * @returns The SVG Image as TemplateResult if it matches the OSDM code, or null if its not found.
 */
export const svgImageByOSDMCode = (osdmCode: string): TemplateResult | null => {
  return mapCodeToSvg[osdmCode] ? svgImage(mapCodeToSvg[osdmCode]) : null;
};

const chassisTable = html`
  <table class="sbb-table-m">
    <thead>
      <tr>
        <th scope="col">SVG</th>
        <th scope="col">Figma</th>
        <th scope="col">OSDM Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${svgImageByOSDMCode('DRIVER_AREA')}</td>
        <td>Driver: Train</td>
        <td>DRIVER_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('DRIVER_AREA_FULL')}</td>
        <td>Driver: Train (Test)</td>
        <td>DRIVER_AREA</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisDriverBus)}</td>
        <td>Driver: Bus</td>
        <td>DRIVER_AREA</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisPassageCompartmentLeftTop)}</td>
        <td>Passage-Compartment: Top</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_HIGH</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisPassageCompartmentMiddle)}</td>
        <td>Passage-Compartment: Middle</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_MIDDLE</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisPassageCompartmentRightBottom)}</td>
        <td>Passage-Compartment: Bottom</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_LOW</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisPassageWaggonTopLeft)}</td>
        <td>Passage-Waggon Type: Left</td>
        <td>COACH_PASSAGE</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisPassageWaggonBottomRight)}</td>
        <td>Passage-Waggon Type: Right</td>
        <td>COACH_PASSAGE</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisRowOuter)}</td>
        <td>Row-Empty: Top/Left</td>
        <td>COACH_BORDER_OUTER</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisRowMiddle)}</td>
        <td>Row-Empty: Middle</td>
        <td>COACH_BORDER_MIDDLE</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisSeparator)}</td>
        <td>Separator</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('TABLE')}</td>
        <td>Table</td>
        <td>TABLE</td>
      </tr>
    </tbody>
  </table>
`;

const interiorTable = html`
  <table class="sbb-table-m">
    <thead>
      <tr>
        <th scope="col">SVG</th>
        <th scope="col">Figma</th>
        <th scope="col">OSDM Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${svgImage(assets.interiorPlaceBikeDefault)}</td>
        <td>Place-Bike: Available</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceBikeSelected)}</td>
        <td>Place-Bike: Selected</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceBikeUnavailable)}</td>
        <td>Place-Bike: Unavailable</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceBikeNotBookable)}</td>
        <td>Place-Bike: Not bookable</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceSeatDefault)}</td>
        <td>Place-Seat: Available</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceSeatSelected)}</td>
        <td>Place-Seat: Selected</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceSeatUnavailable)}</td>
        <td>Place-Seat: Unavailable</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.interiorPlaceSeatNotBookable)}</td>
        <td>Place-Seat: Not bookable</td>
        <td></td>
      </tr>
    </tbody>
  </table>
`;
const layoutItemsTable = html`
  <table class="sbb-table-m">
    <thead>
      <tr>
        <th scope="col">SVG</th>
        <th scope="col">Figma</th>
        <th scope="col">OSDM Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${svgImage(assets.layoutEntrance)}</td>
        <td>Entrance</td>
        <td>ENTRY_EXIT</td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceLuggage)}</td>
        <td>Luggage</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceFamily)}</td>
        <td>Playground</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.servicePram)}</td>
        <td>Pram</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.layoutSki)}</td>
        <td>Ski</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.layoutStair)}</td>
        <td>Stair</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceToilet)}</td>
        <td>Toilet</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceToiletPrm)}</td>
        <td>Toilet-Handicap</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.layoutWardrobe)}</td>
        <td>Wardrobe</td>
        <td></td>
      </tr>
    </tbody>
  </table>
`;

const serviceIconTable = html`
  <table class="sbb-table-m">
    <thead>
      <tr>
        <th scope="col">SVG</th>
        <th scope="col">Figma</th>
        <th scope="col">OSDM Code</th>
        <th scope="col">OSDM Icon Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${svgImage(assets.serviceBistro)}</td>
        <td>Bistro</td>
        <td>BISTRO</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceBusiness)}</td>
        <td>Business</td>
        <td>BUSINESS</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceFamily)}</td>
        <td>Family</td>
        <td>PLAYGROUND_AREA</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceLuggage)}</td>
        <td>Luggage</td>
        <td>LUGGAGE_AREA</td>
        <td>109</td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceMultifunction)}</td>
        <td>Multifunction</td>
        <td>MULTI_FUNCTION_AREA</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.servicePram)}</td>
        <td>Pram</td>
        <td>PRAM_ICON</td>
        <td>112</td>
      </tr>
      <tr>
        <td>${svgImage(assets.servicePrm)}</td>
        <td>PRM</td>
        <td>EASY_ACCESS</td>
        <td>105</td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceRestaurant)}</td>
        <td>Restaurant</td>
        <td>RESTAURANT_ICON</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceSilence)}</td>
        <td>Silence</td>
        <td>SILENCE</td>
        <td>116</td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceToilet)}</td>
        <td>Toilet</td>
        <td>TOILET_AREA</td>
        <td>115</td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceToiletPrm)}</td>
        <td>Toilet-PRM</td>
        <td>WHEELCHAIR_TOILET_AREA</td>
        <td>131</td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceWheelchair)}</td>
        <td>Wheelchair</td>
        <td>WHEELCHAIR_ICON</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(assets.serviceWifi)}</td>
        <td>Wifi</td>
        <td>WIFI</td>
        <td>130</td>
      </tr>
    </tbody>
  </table>
`;

export const assetsTemplate: TemplateResult = html`
  <h1>Assets</h1>
  <h2>Chassis</h2>
  ${chassisTable}
  <h3>Row-Empty</h3>
  ${svgTmpImage(assets.chassisTmpRowEmpty, 'dark')}
  <h2>Helper</h2>
  <h3>Note</h3>
  ${svgTmpImage(assets.helperTmpNoteDefault)} ${svgTmpImage(assets.helperTmpNotePostIt)}
  <h3>Placeholder</h3>
  ${svgTmpImage(assets.helperTmpPlaceholder)}
  <h2>Interior</h2>
  ${interiorTable}
  <h3>Table</h3>
  ${svgTmpImage(assets.interiorTmpTable)}
  <h2>Layout</h2>
  ${layoutItemsTable}
  <h3>Generic-Space</h3>
  ${svgTmpImage(assets.layoutTmpGenericSpace)}
  <h2>Service Icons</h2>
  ${serviceIconTable}
`;
