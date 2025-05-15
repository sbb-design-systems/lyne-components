import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { svgs, mapIconToSvg } from '../common.js';

import './seat-reservation-assets.scss';

import '@sbb-esta/lyne-elements/table.js';
import '../seat-reservation-graphic.js';

const svgImage = (src: string): TemplateResult => {
  return html`
    <div class="story-asset">
      <span class="story-asset__preview">${unsafeHTML(src)}</span>
    </div>
  `;
};

const svgTmpImage = (src: string, variant: 'LIGHT' | 'DARK' = 'LIGHT'): TemplateResult => {
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
  return mapIconToSvg[osdmCode]?.svg ? svgImage(mapIconToSvg[osdmCode].svg) : null;
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
        <td>${svgImage(svgs.chassisDriverBus)}</td>
        <td>Driver: Bus</td>
        <td>DRIVER_AREA</td>
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
        <td>${svgImage(svgs.chassisPassageWaggonBottomRight)}</td>
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
        <td>${svgImage(svgs.chassisSeparator)}</td>
        <td>Separator</td>
        <td>obsolete?</td>
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
        <th scope="col">Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BICYCLE_FREE')}</td>
        <td>Place-Bike: Available</td>
        <td>PLACE_BICYCLE_FREE</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BICYCLE_SELECTED')}</td>
        <td>Place-Bike: Selected</td>
        <td>PLACE_BICYCLE_SELECTED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BICYCLE_ALLOCATED')}</td>
        <td>Place-Bike: Unavailable</td>
        <td>PLACE_BICYCLE_ALLOCATED</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('PLACE_BICYCLE_RESTRICTED')}</td>
        <td>Place-Bike: Not bookable</td>
        <td>PLACE_BICYCLE_RESTRICTED</td>
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
        <td>${svgImageByOSDMCode('TOILET_WHEELCHAIR_AREA')}</td>
        <td>Toilet-Handicap</td>
        <td>TOILET_WHEELCHAIR_AREA</td>
      </tr>
      <tr>
        <td>${svgImageByOSDMCode('WARDROBE_AREA')}</td>
        <td>Wardrobe</td>
        <td>???</td>
      </tr>
    </tbody>
  </table>
`;
const serviceIconTable = html`
  <sbb-table-wrapper>
    <table aria-label="Available Service Icons" class="sbb-table">
      <thead>
        <tr>
          <th scope="col">SVG</th>
          <th scope="col">Figma</th>
          <th scope="col">OSDM Code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><sbb-seat-reservation-graphic name="BISTRO"></sbb-seat-reservation-graphic></td>
          <td>Bistro</td>
          <td>BISTRO</td>
        </tr>
        <tr>
          <td><sbb-seat-reservation-graphic name="BUSINESS"></sbb-seat-reservation-graphic></td>
          <td>Business</td>
          <td>BUSINESS</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic name="PLAYGROUND_ICON"></sbb-seat-reservation-graphic>
          </td>
          <td>Family</td>
          <td>PLAYGROUND_ICON</td>
        </tr>
        <tr>
          <td><sbb-seat-reservation-graphic name="LUGGAGE_AREA"></sbb-seat-reservation-graphic></td>

          <td>Luggage</td>
          <td>LUGGAGE_AREA</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic name="MULTI_FUNCTION_AREA"></sbb-seat-reservation-graphic>
          </td>
          <td>Multifunction</td>
          <td>MULTI_FUNCTION_AREA</td>
        </tr>
        <tr>
          <td><sbb-seat-reservation-graphic name="PRAM_ICON"></sbb-seat-reservation-graphic></td>
          <td>Pram</td>
          <td>PRAM_ICON</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic name="EASY_ACCESS_AREA"></sbb-seat-reservation-graphic>
          </td>
          <td>PRM</td>
          <td>EASY_ACCESS_AREA</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic name="RESTAURANT_ICON"></sbb-seat-reservation-graphic>
          </td>
          <td>Restaurant</td>
          <td>RESTAURANT_ICON</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic name="SILENCE_AREA_ICON"></sbb-seat-reservation-graphic>
          </td>
          <td>Silence</td>
          <td>SILENCE_AREA_ICON</td>
        </tr>
        <tr>
          <td><sbb-seat-reservation-graphic name="TOILET_AREA"></sbb-seat-reservation-graphic></td>
          <td>Toilet</td>
          <td>TOILET_AREA</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic
              name="TOILET_WHEELCHAIR_AREA"
            ></sbb-seat-reservation-graphic>
          </td>
          <td>Toilet-PRM</td>
          <td>TOILET_WHEELCHAIR_AREA</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-graphic name="WHEELCHAIR_ICON"></sbb-seat-reservation-graphic>
          </td>
          <td>Wheelchair</td>
          <td>WHEELCHAIR_ICON</td>
        </tr>
        <tr>
          <td><sbb-seat-reservation-graphic name="WIFI"></sbb-seat-reservation-graphic></td>
          <td>Wifi</td>
          <td>WIFI</td>
        </tr>
      </tbody>
    </table>
  </sbb-table-wrapper>
`;

export const assetsTemplate: TemplateResult = html`
  <h1>List of all currently available assets (some may be temporary).</h1>
  <h2>Chassis</h2>
  ${chassisTable}
  <h3>Row-Empty</h3>
  ${svgTmpImage(svgs.chassisTmpRowEmpty, 'DARK')}
  <h2>Interior</h2>
  ${interiorTable}
  <h3>Table</h3>
  ${svgTmpImage(svgs.interiorTmpTable)}
  <h2>Layout</h2>
  ${layoutItemsTable}
  <h3>Generic-Space</h3>
  ${svgTmpImage(svgs.layoutTmpGenericSpace)}
  <h2>Service Icons</h2>
  ${serviceIconTable}
`;
