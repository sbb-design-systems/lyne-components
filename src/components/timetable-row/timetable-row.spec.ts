import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import type { ITripItem, Notice, PtSituation } from '../core/timetable';

import type { SbbTimetableRowElement } from './timetable-row';
import {
  filterNotices,
  getCus,
  getHimIcon,
  getTransportIcon,
  isProductIcon,
  sortSituation,
} from './timetable-row';
import {
  defaultTrip,
  busTrip,
  partiallyCancelled,
  walkTimeTrip,
} from './timetable-row.sample-data';
import '.';

const now = new Date('2022-08-16T15:00:00Z').valueOf();

describe('sbb-timetable-row', () => {
  let element: SbbTimetableRowElement;

  describe('sbb-timetable-row with defaultTrip', () => {
    it('renders component with config', async () => {
      element = await fixture(html`<sbb-timetable-row data-now="${now}"></sbb-timetable-row>`);

      element.trip = defaultTrip as ITripItem;
      await waitForLitRender(element);

      expect(element).dom.to.be.equal(`
        <sbb-timetable-row data-now="1660662000000" role="rowgroup">
        </sbb-timetable-row>
      `);

      expect(element).shadowDom.to.be.equal(`
        <sbb-card color="white" data-action-role="button" data-has-action size="l">
          <sbb-card-button dir="ltr" role="button" slot="action" tabindex="0">
            Departure: 11:08,   Train,  IR 37,  Direction Basel SBB,       Arrival: 12:13,   Travel time 1 Hour 15 Minutes,
          </sbb-card-button>
          <div class="sbb-timetable__row" role="row">
            <div class="sbb-timetable__row-header" role="gridcell">
              <div class="sbb-timetable__row-details">
                <span class="sbb-timetable__row-transport-wrapper">
                  <sbb-icon aria-hidden="true" data-namespace="picto" role="img" class="sbb-timetable__row-transport-icon" name="picto:train-right"></sbb-icon>
                  <span class="sbb-screenreaderonly">
                    Train
                  </span>
                </span>
                <span class="sbb-timetable__row-transport">
                  <sbb-icon aria-hidden="true" data-namespace="default" role="img" name="ir-37"></sbb-icon>
                  <span class="sbb-screenreaderonly">
                    ir-37
                  </span>
                </span>
              </div>
              <p>
                Direction Basel SBB
              </p>
            </div>
            <sbb-pearl-chain-time data-now="1660662000000" role="gridcell"></sbb-pearl-chain-time>
            <div class="sbb-timetable__row-footer" role="gridcell">
              <time>
                <span class="sbb-screenreaderonly">
                  Travel time 1 Hour 15 Minutes
                </span>
                <span aria-hidden="true">
                  1 h 15 min
                </span>
              </time>
            </div>
          </div>
        </sbb-card>
      `);
    });
  });

  describe('sbb-timetable-row with BusTrip', () => {
    it('renders component with config', async () => {
      element = await fixture(html`<sbb-timetable-row data-now="${now}"></sbb-timetable-row>`);

      element.trip = busTrip as ITripItem;
      await waitForLitRender(element);

      expect(element).dom.to.be.equal(`
        <sbb-timetable-row data-now="1660662000000" role="rowgroup">
        </sbb-timetable-row>
      `);

      expect(element).shadowDom.to.be.equal(`
        <sbb-card color="white" data-action-role="button" data-has-action size="l">
          <sbb-card-button dir="ltr" role="button" slot="action" tabindex="0">
            Departure: 16:30,  from Stand 4,  Bus,  B 19,  Direction Spiegel, Blinzern,       Arrival: 17:06,   Travel time 41 Minutes,  2 changes,  First Class Low to medium occupancy expected. Second Class High occupancy expected.
          </sbb-card-button>
          <div class="sbb-timetable__row" role="row">
            <div class="sbb-timetable__row-header" role="gridcell">
              <div class="sbb-timetable__row-details">
                <span class="sbb-timetable__row-transport-wrapper">
                  <sbb-icon aria-hidden="true" data-namespace="picto" role="img" class="sbb-timetable__row-transport-icon" name="picto:bus-right"></sbb-icon>
                  <span class="sbb-screenreaderonly">
                    Bus
                  </span>
                </span>
                <span class="sbb-timetable__row-transportnumber">
                  B 19
                </span>
              </div>
              <p>
                Direction Spiegel, Blinzern
              </p>
            </div>
            <sbb-pearl-chain-time data-now="1660662000000" role="gridcell"></sbb-pearl-chain-time>
            <div class="sbb-timetable__row-footer" role="gridcell">
              <span>
                <span class="sbb-screenreaderonly">
                  Departure
                </span>
                <span class="sbb-timetable__row--quay">
                  <span class="sbb-screenreaderonly">
                    from Stand
                  </span>
                  <span class="sbb-timetable__row--quay-type" aria-hidden="true">
                    Stand
                  </span>
                </span>
                4
              </span>
              <sbb-timetable-occupancy></sbb-timetable-occupancy>
              <time>
              <span class="sbb-screenreaderonly">
                Travel time 41 Minutes
              </span>
              <span aria-hidden="true">
              41 min
              </span>
            </time>
            </div>
          </div>
        </sbb-card>
      `);
    });
  });

  describe('sbb-timetable-row loading state', () => {
    it('renders loading state', async () => {
      element = await fixture(
        html`<sbb-timetable-row loading-trip loading-price data-now="${now}"></sbb-timetable-row>`,
      );

      element.loadingTrip = true;
      await waitForLitRender(element);

      expect(element).dom.to.be.equal(`
        <sbb-timetable-row loading-trip="" loading-price="" data-now="1660662000000">
        </sbb-timetable-row>
      `);

      expect(element).shadowDom.to.be.equal(`
        <sbb-card color="white" data-has-card-badge class="sbb-loading" size="l">
          <sbb-card-badge
            class="sbb-loading__badge"
            color="charcoal"
            dir="ltr"
            role="text"
            slot="badge"></sbb-card-badge>
          <div class="sbb-loading__wrapper">
            <div class="sbb-loading__row"></div>
            <div class="sbb-loading__row"></div>
            <div class="sbb-loading__row"></div>
          </div>
        </sbb-card>
      `);
    });
  });
});

describe('getTransportIcon', () => {
  it('should return ship / jetty', () => {
    expect(getTransportIcon('SHIP', '', 'de')).to.be.equal('jetty-right');
  });

  it('should return empty string', () => {
    expect(getTransportIcon('UNKNOWN', '', 'de')).to.be.equal('');
  });

  it('should return metro string', () => {
    expect(getTransportIcon('METRO', 'PB', 'fr')).to.be.equal('metro-right-fr');
  });

  it('should return metro en string', () => {
    expect(getTransportIcon('METRO', 'PB', 'en')).to.be.equal('metro-right-de');
  });

  it('should return cableway string', () => {
    expect(getTransportIcon('GONDOLA', 'PB', 'de')).to.be.equal('cableway-right');
  });

  it('should return gondola string', () => {
    expect(getTransportIcon('GONDOLA', 'GB', 'de')).to.be.equal('gondola-lift-right');
  });
});

describe('isProductIcon', () => {
  it('should return true', () => {
    expect(isProductIcon('ic')).to.be.equal(true);
  });

  it('should return false', () => {
    expect(isProductIcon('icc')).to.be.equal(false);
  });
});

describe('sortSituation', () => {
  it('should return sorted array', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ]),
    ).to.be.eql([
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
    ]);
  });

  it('should return sorted array even with double causes', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ]),
    ).to.be.eql([
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
    ]);
  });
});

describe('getHimIcon', () => {
  it('should return replacementbus', () => {
    const situation: PtSituation = {
      cause: 'TRAIN_REPLACEMENT_BY_BUS',
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).to.be.equal('replacementbus');
    expect(getHimIcon(situation).text).to.be.equal('');
  });

  it('should return info', () => {
    const situation: PtSituation = {
      cause: null,
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).to.be.equal('info');
  });
});

describe('getCus', () => {
  it('should return cancellation', () => {
    expect(getCus(partiallyCancelled as ITripItem, 'en')).to.be.eql({
      name: 'cancellation',
      text: undefined,
    });
  });
});

describe('filterNotices', () => {
  it('should return sa-rr', () => {
    expect(filterNotices(walkTimeTrip?.notices as Notice[])).to.be.eql([]);
  });
});
