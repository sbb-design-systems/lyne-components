import { html, type TemplateResult } from 'lit';

import './seat-reservation-assets.scss';

import chassisDriverBusEnd from '../assets/chassis-driver-bus-end.svg';
import chassisDriverBusStart from '../assets/chassis-driver-bus-start.svg';
import chassisDriverTrainEnd from '../assets/chassis-driver-train-end.svg';
import chassisDriverTrainStart from '../assets/chassis-driver-train-start.svg';
import chassisPassageCompartmentLeftTop from '../assets/chassis-passage-compartment-left-top.svg';
import chassisPassageCompartmentMiddle from '../assets/chassis-passage-compartment-middle.svg';
import chassisPassageCompartmentRightBottom from '../assets/chassis-passage-compartment-right-bottom.svg';
import chassisPassageWaggonBottomRight from '../assets/chassis-passage-waggon-bottom-right.svg';
import chassisPassageWaggonTopLeft from '../assets/chassis-passage-waggon-top-left.svg';
import chassisSeparator from '../assets/chassis-separator.svg';
import chassisTmpRowEmpty from '../assets/chassis-tmp-row-empty.svg';
import helperTmpNoteDefault from '../assets/helper-tmp-note-default.svg';
import helperTmpNotePostIt from '../assets/helper-tmp-note-post-it.svg';
import helperTmpPlaceholder from '../assets/helper-tmp-placeholder.svg';
import interiorPlaceBikeDefault from '../assets/interior-place-bike-default.svg';
import interiorPlaceBikeSelected from '../assets/interior-place-bike-selected.svg';
import interiorPlaceBikeUnavailableNotBookable from '../assets/interior-place-bike-unavailable-not-bookable.svg';
import interiorPlaceSeatDefault from '../assets/interior-place-seat-default.svg';
import interiorPlaceSeatNotBookable from '../assets/interior-place-seat-not-bookable.svg';
import interiorPlaceSeatSelected from '../assets/interior-place-seat-selected.svg';
import interiorPlaceSeatUnavailable from '../assets/interior-place-seat-unavailable.svg';
import interiorTableTest from '../assets/interior-table.svg';
import interiorTmpTable from '../assets/interior-tmp-table.svg';
import layoutEntrance from '../assets/layout-entrance.svg';
import layoutSki from '../assets/layout-ski.svg';
import layoutStair from '../assets/layout-stair.svg';
import layoutTmpGenericSpace from '../assets/layout-tmp-generic-space.svg';
import layoutWardrobe from '../assets/layout-wardrobe.svg';
import serviceBistro from '../assets/service-bistro.svg';
import serviceBusiness from '../assets/service-business.svg';
import serviceFamily from '../assets/service-family.svg';
import serviceLuggage from '../assets/service-luggage.svg';
import serviceMultifunction from '../assets/service-multifunction.svg';
import servicePram from '../assets/service-pram.svg';
import servicePrm from '../assets/service-prm.svg';
import serviceRestaurant from '../assets/service-restaurant.svg';
import serviceSilence from '../assets/service-silence.svg';
import serviceToiletPrm from '../assets/service-toilet-prm.svg';
import serviceToilet from '../assets/service-toilet.svg';
import serviceWheelchair from '../assets/service-wheelchair.svg';
import serviceWifi from '../assets/service-wifi.svg';

/**
 * Map Object from OSDM Code to SVG
 */
const mapCodeToSvg: Record<string, string> = {
  BISTRO: serviceBistro,
  BUSINESS: serviceBusiness,
  COMPARTMENT_PASSAGE: chassisPassageCompartmentMiddle,
  COMPARTMENT_PASSAGE_HIGH: chassisPassageCompartmentLeftTop,
  COMPARTMENT_PASSAGE_LOW: chassisPassageCompartmentRightBottom,
  COACH_PASSAGE: chassisPassageWaggonTopLeft,
  DRIVER_AREA: chassisDriverTrainStart,
  EASY_ACCESS_AREA: servicePrm,
  LUGGAGE_AREA: serviceLuggage,
  MULTI_FUNCTION_AREA: serviceMultifunction,
  PRAM_AREA: servicePram,
  PRAM_ICON: servicePram,
  PLACE_SEAT_FREE: interiorPlaceSeatDefault,
  PLACE_SEAT_SELECTED: interiorPlaceSeatSelected,
  PLACE_SEAT_RESTRICTED: interiorPlaceSeatNotBookable,
  PLACE_SEAT_ALLOCATED: interiorPlaceSeatUnavailable,
  PLACE_BIKE_FREE: interiorPlaceSeatDefault,
  PLACE_BIKE_SELECTED: interiorPlaceBikeSelected,
  PLACE_BIKE_RESTRICTED: interiorPlaceBikeUnavailableNotBookable,
  PLACE_BIKE_ALLOCATED: interiorPlaceBikeUnavailableNotBookable,
  PLAYGROUND_ICON: serviceFamily,
  PLAYGROUND_AREA: serviceFamily,
  TABLE: interiorTableTest,
  TOILET_AREA: serviceToilet,
  SKI_AREA: layoutSki,
  SKI_ICON: layoutSki,
  SILENCE_AREA_ICON: serviceSilence,
  STAIR_AREA: layoutStair,
  RESTAURANT_ICON: serviceRestaurant,
  WHEELCHAIR: serviceWheelchair,
  WHEELCHAIR_TOILET_AREA: serviceToiletPrm,
  WIFI: serviceWifi,
};

const svgImage = (src: string, alt = '', title = ''): TemplateResult => {
  return html`
    <div class="story-image">
      <img class="story-image__preview" src="${src}" alt="${alt}" title="${title}" />
    </div>
  `;
};

const svgTmpImage = (src: string): TemplateResult => {
  return html`
    <div class="story-image">
      <p class="story-image__hint">temporäre Ansicht ... per CSS erstellen</p>
      <img class="story-image__preview story-image__preview--tmp" src="${src}" alt="" title="" />
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
export const svgImageByOSDMCode = (
  osdmCode: string,
  alt = '',
  title = '',
): TemplateResult | null => {
  return mapCodeToSvg[osdmCode] ? svgImage(mapCodeToSvg[osdmCode], alt, title) : null;
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
        <td>${svgImage(chassisDriverTrainEnd)}</td>
        <td>Driver: Train</td>
        <td>DRIVER_AREA</td>
      </tr>
      <tr>
        <td>${svgImage(chassisDriverBusStart)}</td>
        <td>Driver: Bus</td>
        <td>DRIVER_AREA</td>
      </tr>
      <tr>
        <td>${svgImage(chassisDriverBusEnd)}</td>
        <td>Driver: Bus</td>
        <td>DRIVER_AREA</td>
      </tr>
      <tr>
        <td>${svgImage(chassisPassageCompartmentLeftTop)}</td>
        <td>Passage-Compartment: Top</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_HIGH</td>
      </tr>
      <tr>
        <td>${svgImage(chassisPassageCompartmentMiddle)}</td>
        <td>Passage-Compartment: Middle</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_MIDDLE</td>
      </tr>
      <tr>
        <td>${svgImage(chassisPassageCompartmentRightBottom)}</td>
        <td>Passage-Compartment: Bottom</td>
        <td>COMPARTMENT_PASSAGE<br />COMPARTMENT_PASSAGE_LOW</td>
      </tr>
      <tr>
        <td>${svgImage(chassisPassageWaggonTopLeft)}</td>
        <td>Passage-Waggon Type: Left</td>
        <td>COACH_PASSAGE</td>
      </tr>
      <tr>
        <td>${svgImage(chassisPassageWaggonBottomRight)}</td>
        <td>Passage-Waggon Type: Right</td>
        <td>COACH_PASSAGE</td>
      </tr>
      <tr>
        <td>${svgImage(chassisSeparator)}</td>
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
        <td>${svgImage(interiorPlaceBikeDefault)}</td>
        <td>Place-Bike: Available</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(interiorPlaceBikeSelected)}</td>
        <td>Place-Bike: Selected</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(interiorPlaceBikeUnavailableNotBookable)}</td>
        <td>Place-Bike: Unavailable / Not bookable</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(interiorPlaceSeatDefault)}</td>
        <td>Place-Seat: Available</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(interiorPlaceSeatSelected)}</td>
        <td>Place-Seat: Selected</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(interiorPlaceSeatUnavailable)}</td>
        <td>Place-Seat: Unavailable</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(interiorPlaceSeatNotBookable)}</td>
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
        <td>${svgImage(layoutEntrance)}</td>
        <td>Entrance</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceLuggage)}</td>
        <td>Luggage</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceFamily)}</td>
        <td>Playground</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(servicePram)}</td>
        <td>Pram</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(layoutSki)}</td>
        <td>Ski</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(layoutStair)}</td>
        <td>Stair</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceToilet)}</td>
        <td>Toilet</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceToiletPrm)}</td>
        <td>Toilet-Handicap</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(layoutWardrobe)}</td>
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
        <td>${svgImage(serviceBistro)}</td>
        <td>Bistro</td>
        <td>BISTRO</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceBusiness)}</td>
        <td>Business</td>
        <td>BUSINESS</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceFamily)}</td>
        <td>Family</td>
        <td>PLAYGROUND_AREA</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceLuggage)}</td>
        <td>Luggage</td>
        <td>LUGGAGE_AREA</td>
        <td>109</td>
      </tr>
      <tr>
        <td>${svgImage(serviceMultifunction)}</td>
        <td>Multifunction</td>
        <td>MULTI_FUNCTION_AREA</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(servicePram)}</td>
        <td>Pram</td>
        <td>PRAM_ICON</td>
        <td>112</td>
      </tr>
      <tr>
        <td>${svgImage(servicePrm)}</td>
        <td>PRM</td>
        <td>EASY_ACCESS</td>
        <td>105</td>
      </tr>
      <tr>
        <td>${svgImage(serviceRestaurant)}</td>
        <td>Restaurant</td>
        <td>RESTAURANT_ICON</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceSilence)}</td>
        <td>Silence</td>
        <td>SILENCE</td>
        <td>116</td>
      </tr>
      <tr>
        <td>${svgImage(serviceToilet)}</td>
        <td>Toilet</td>
        <td>TOILET_AREA</td>
        <td>115</td>
      </tr>
      <tr>
        <td>${svgImage(serviceToiletPrm)}</td>
        <td>Toilet-PRM</td>
        <td>WHEELCHAIR_TOILET_AREA</td>
        <td>131</td>
      </tr>
      <tr>
        <td>${svgImage(serviceWheelchair)}</td>
        <td>Wheelchair</td>
        <td>WHEELCHAIR</td>
        <td></td>
      </tr>
      <tr>
        <td>${svgImage(serviceWifi)}</td>
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
  ${svgTmpImage(chassisTmpRowEmpty)}
  <h2>Helper</h2>
  <h3>Note</h3>
  ${svgTmpImage(helperTmpNoteDefault)} ${svgTmpImage(helperTmpNotePostIt)}
  <h3>Placeholder</h3>
  ${svgTmpImage(helperTmpPlaceholder)}
  <h2>Interior</h2>
  ${interiorTable}
  <h3>Table</h3>
  ${svgTmpImage(interiorTmpTable)}
  <h2>Layout</h2>
  ${layoutItemsTable}
  <h3>Generic-Space</h3>
  ${svgTmpImage(layoutTmpGenericSpace)}
  <h2>Service Icons</h2>
  ${serviceIconTable}
`;
