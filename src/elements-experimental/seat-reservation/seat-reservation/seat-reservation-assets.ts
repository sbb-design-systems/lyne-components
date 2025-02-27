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
        <td>???</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('COMPARTMENT_PASSAGE_HIGH')}</td>
        <td>Passage-Compartment: Top</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_HIGH</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('COMPARTMENT_PASSAGE')}</td>
        <td>Passage-Compartment: Middle</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_MIDDLE</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('COMPARTMENT_PASSAGE_LOW')}</td>
        <td>Passage-Compartment: Bottom</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_LOW</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('COACH_PASSAGE')}</td>
        <td>Passage-Waggon Type: Left</td>
        <td>COACH_PASSAGE</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisPassageWaggonBottomRight)}</td>
        <td>Passage-Waggon Type: Right</td>
        <td>???</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('COACH_BORDER_OUTER')}</td>
        <td>Row-Empty: Top/Left</td>
        <td>COACH_BORDER_OUTER</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('COACH_BORDER_MIDDLE')}</td>
        <td>Row-Empty: Middle</td>
        <td>COACH_BORDER_MIDDLE</td>
      </tr>
      <tr>
        <td>${svgImage(assets.chassisSeparator)}</td>
        <td>Separator</td>
        <td>???</td>
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
        <td>${svgImageByOSDMCode('PLACE_BIKE_FREE')}</td>
        <td>Place-Bike: Available</td>
        <td>PLACE_BIKE_FREE</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BIKE_SELECTED')}</td>
        <td>Place-Bike: Selected</td>
        <td>PLACE_BIKE_SELECTED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BIKE_ALLOCATED')}</td>
        <td>Place-Bike: Unavailable</td>
        <td>PLACE_BIKE_ALLOCATED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BIKE_RESTRICTED')}</td>
        <td>Place-Bike: Not bookable</td>
        <td>PLACE_BIKE_RESTRICTED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_SEAT_FREE')}</td>
        <td>Place-Seat: Available</td>
        <td>PLACE_SEAT_FREE</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_SEAT_SELECTED')}</td>
        <td>Place-Seat: Selected</td>
        <td>PLACE_SEAT_SELECTED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_SEAT_ALLOCATED')}</td>
        <td>Place-Seat: Unavailable</td>
        <td>PLACE_SEAT_ALLOCATED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_SEAT_RESTRICTED')}</td>
        <td>Place-Seat: Not bookable</td>
        <td>PLACE_SEAT_RESTRICTED</td>
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
        <td>${svgImageByOSDMCode('ENTRY_EXIT')}</td>
        <td>Entrance</td>
        <td>ENTRY_EXIT</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('LUGGAGE_AREA')}</td>
        <td>Luggage</td>
        <td>LUGGAGE_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLAYGROUND_AREA')}</td>
        <td>Playground</td>
        <td>PLAYGROUND_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PRAM_AREA')}</td>
        <td>Pram</td>
        <td>PRAM_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('SKI_AREA')}</td>
        <td>Ski</td>
        <td>SKI_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('STAIR_AREA')}</td>
        <td>Stair</td>
        <td>STAIR_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('TOILET_AREA')}</td>
        <td>Toilet</td>
        <td>TOILET_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('WHEELCHAIR_TOILET_AREA')}</td>
        <td>Toilet-Handicap</td>
        <td>WHEELCHAIR_TOILET_AREA</td>
      </tr>
      <tr>
        <td>${svgImage(assets.layoutWardrobe)}</td>
        <td>Wardrobe</td>
        <td>???</td>
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
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${svgImageByOSDMCode('BISTRO')}</td>
        <td>Bistro</td>
        <td>BISTRO</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('BUSINESS')}</td>
        <td>Business</td>
        <td>BUSINESS</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLAYGROUND_ICON')}</td>
        <td>Family</td>
        <td>PLAYGROUND_ICON</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('LUGGAGE_AREA')}</td>
        <td>Luggage</td>
        <td>LUGGAGE_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('MULTI_FUNCTION_AREA')}</td>
        <td>Multifunction</td>
        <td>MULTI_FUNCTION_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PRAM_ICON')}</td>
        <td>Pram</td>
        <td>PRAM_ICON</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('EASY_ACCESS_AREA')}</td>
        <td>PRM</td>
        <td>EASY_ACCESS_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('RESTAURANT_ICON')}</td>
        <td>Restaurant</td>
        <td>RESTAURANT_ICON</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('SILENCE_AREA_ICON')}</td>
        <td>Silence</td>
        <td>SILENCE_AREA_ICON</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('TOILET_AREA')}</td>
        <td>Toilet</td>
        <td>TOILET_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('WHEELCHAIR_TOILET_AREA')}</td>
        <td>Toilet-PRM</td>
        <td>WHEELCHAIR_TOILET_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('WHEELCHAIR_ICON')}</td>
        <td>Wheelchair</td>
        <td>WHEELCHAIR_ICON</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('WIFI')}</td>
        <td>Wifi</td>
        <td>WIFI</td>
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
