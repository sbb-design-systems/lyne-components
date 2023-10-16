import { waitForLitRender } from '../../global/testing';
import { ITripItem } from '../../global/timetable';
import { SbbTimetableRow } from './sbb-timetable-row';
import { defaultTrip, busTrip } from './sbb-timetable-row.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../sbb-timetable-row';

const now = new Date('2022-08-16T15:00:00Z').valueOf();

describe('sbb-timetable-row', () => {
  let element: SbbTimetableRow;

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
          <sbb-card-action aria-expanded dir="ltr" role="button" slot="action" tabindex="0">
           Departure: 11:08.   Train.  IR 37.  Direction Basel SBB.      Arrival: 12:13.   Travel time 1 Hour 15 Minutes.
          </sbb-card-action>
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
            <sbb-pearl-chain-time arrival-time="2022-11-30T12:13:00+01:00" data-now="1660662000000" departure-time="2022-11-30T11:08:00+01:00" role="gridcell"></sbb-pearl-chain-time>
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
          <mock:shadow-root>
            <sbb-card size="l">
              <sbb-card-action>
                Departure: 16:30. from Stand 4. Bus. B 19. Direction Spiegel, Blinzern. Arrival: 17:06. Travel time 41 Minutes. 2 changes. First Class Low to medium occupancy expected. Second Class High occupancy expected.
              </sbb-card-action>
              <div class="sbb-timetable__row" role="row">
                <div class="sbb-timetable__row-header" role="gridcell">
                  <div class="sbb-timetable__row-details">
                    <span class="sbb-timetable__row-transport-wrapper">
                      <sbb-icon class="sbb-timetable__row-transport-icon" name="picto:bus-right"></sbb-icon>
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
                <sbb-pearl-chain-time arrivaltime="2022-11-30T17:06:00+01:00" arrivalwalk="0" data-now="1660662000000" departuretime="2022-11-30T16:30:00+01:00" departurewalk="0" role="gridcell"></sbb-pearl-chain-time>
                <div class="sbb-timetable__row-footer" role="gridcell">
                  <span>
                    <span class="sbb-screenreaderonly">
                      Departure
                    </span>
                    <span class="sbb-timetable__row--quay">
                      <span class="sbb-screenreaderonly">
                        from Stand
                      </span>
                      <span aria-hidden="true">
                        Stand
                      </span>
                    </span>
                    4
                  </span>
                  <ul class="sbb-timetable__row-occupancy" role="list">
                    <li>
                      <span aria-hidden="true">
                        1.
                      </span>
                      <sbb-icon class="sbb-occupancy__item" name="utilization-low"></sbb-icon>
                      <span class="sbb-screenreaderonly">
                        First Class Low to medium occupancy expected.
                      </span>
                    </li>
                    <li>
                      <span aria-hidden="true">
                        2.
                      </span>
                      <sbb-icon class="sbb-occupancy__item" name="utilization-medium"></sbb-icon>
                      <span class="sbb-screenreaderonly">
                        Second Class High occupancy expected.
                      </span>
                    </li>
                  </ul>
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
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
    });
  });

  describe('sbb-timetable-row loading state', () => {
    it('renders loading state', async () => {
      element = await fixture(
        html`<sbb-timetable-row loading-trip="true" loading-price="true" data-now="${now}" />`,
      );

      element.loadingTrip = true;
      await waitForLitRender(element);

      expect(element).dom.to.be.equal(`
        <sbb-timetable-row loading-trip="true" loading-price="true" data-now="1660662000000">
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
