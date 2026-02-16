import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { mapIconToSvg } from '../common.ts';

import '@sbb-esta/lyne-elements/table.js';
import '../seat-reservation-graphic.ts';
import '../seat-reservation-area/seat-reservation-area.component.ts';

const svgImage = (src: string): TemplateResult => {
  return html`
    <div class="story-asset">
      <span class="story-asset__preview">${unsafeHTML(src)}</span>
    </div>
  `;
};

/**
 * svgImageByOSDMCode Function returns the corresponding svg image by OSDM Code
 * @param osdmCode
 * @returns The SVG Image as TemplateResult if it matches the OSDM code, or null if it's not found.
 */
export const svgImageByOSDMCode = (osdmCode: string): TemplateResult | null => {
  return mapIconToSvg[osdmCode]?.svg
    ? svgImage(mapIconToSvg[osdmCode].svg)
    : mapIconToSvg[osdmCode]?.svgName
      ? html`<sbb-icon name="${mapIconToSvg[osdmCode].svgName}"></sbb-icon>`
      : null;
};

const interiorTable = html`
  <sbb-table-wrapper>
    <table class="sbb-table">
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
  </sbb-table-wrapper>
`;
const layoutItemsTable = html`
  <sbb-table-wrapper>
    <table class="sbb-table">
      <thead>
        <tr>
          <th scope="col">SVG</th>
          <th scope="col">Figma</th>
          <th scope="col">OSDM Code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${svgImageByOSDMCode('EASY_ACCESS_AREA')}</td>
          <td>Easy Access Area</td>
          <td>EASY_ACCESS_AREA</td>
        </tr>
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
          <td>${svgImageByOSDMCode('MULTI_FUNCTION_AREA')}</td>
          <td>Multi Function Area</td>
          <td>MULTI_FUNCTION_AREA</td>
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
          <td>WARDROBE_AREA</td>
        </tr>
      </tbody>
    </table>
  </sbb-table-wrapper>
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
          <td>${svgImageByOSDMCode('PRAM_ICON')}</td>
          <td>Pram</td>
          <td>PRAM_ICON</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('EASY_ACCESS_AREA')}</td>
          <td>Easy Access Area</td>
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
          <td>${svgImageByOSDMCode('TOILET_WHEELCHAIR_AREA')}</td>
          <td>Toilet-PRM</td>
          <td>TOILET_WHEELCHAIR_AREA</td>
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
  </sbb-table-wrapper>
`;
const chassisTable = html`
  <sbb-table-wrapper>
    <table class="sbb-table">
      <thead>
        <tr>
          <th scope="col">SVG</th>
          <th scope="col">Figma</th>
          <th scope="col">OSDM Code</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${svgImageByOSDMCode('DRIVER_AREA_TRAIN')}</td>
          <td>Driver Area<br />(Dependent on Vehicle-Type: TRAIN)</td>
          <td>DRIVER_AREA</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('DRIVER_AREA_BUS')}</td>
          <td>Driver Area<br />(Dependent on Vehicle-Type: BUS)</td>
          <td>DRIVER_AREA</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('COMPARTMENT_PASSAGE_HIGH')}</td>
          <td>Compartment Passage High</td>
          <td>COMPARTMENT_PASSAGE_HIGH</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('COMPARTMENT_PASSAGE')}</td>
          <td>Compartment Passage</td>
          <td>COMPARTMENT_PASSAGE</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('COMPARTMENT_PASSAGE_LOW')}</td>
          <td>Compartment Passage Low</td>
          <td>COMPARTMENT_PASSAGE_LOW</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('COACH_PASSAGE')}</td>
          <td>Coach Passage</td>
          <td>COACH_PASSAGE</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('COMPARTMENT_WALL')}</td>
          <td>Compartment Wall</td>
          <td>COMPARTMENT_WALL</td>
        </tr>
        <tr>
          <td>
            <sbb-seat-reservation-area
              style="--sbb-seat-reservation-area-width: 100; --sbb-seat-reservation-area-height: 50; align-self: center;
          background: var(--sbb-color-milk)"
            ></sbb-seat-reservation-area>
          </td>
          <td>Table Restaurant<br />(Will be rendered as CSS)</td>
          <td>TABLE_RESTAURANT</td>
        </tr>
        <tr>
          <td>${svgImageByOSDMCode('COACH_WALL_NO_PASSAGE')}</td>
          <td>Coach Wall No Passage</td>
          <td>COACH_WALL_NO_PASSAGE</td>
        </tr>
      </tbody>
    </table>
  </sbb-table-wrapper>
`;

export const assetsTemplate: TemplateResult = html`
  <style>
    .story-asset {
      width: max-content;
      background-color: var(--sbb-color-white);
    }
  </style>
  <h1>List of all currently available assets.</h1>
  <h2>Interior</h2>
  ${interiorTable}
  <h2>Layout</h2>
  ${layoutItemsTable}
  <h2>Service Icons</h2>
  ${serviceIconTable}
  <h2>Chassis</h2>
  ${chassisTable}
`;
