import { newSpecPage } from '@stencil/core/testing';
import { SbbTimetableRow } from './sbb-timetable-row';
import { defaultTrip, BusTrip } from './sbb-timetable-row.sample-data';

const now = new Date('2022-08-16T15:00:00Z').valueOf();

describe('sbb-timetable-row', () => {
  describe('sbb-timetable-row with defaultTrip', () => {
    it('renders component with config', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `
            <sbb-timetable-row data-now="${now}">
            </sbb-timetable-row>
        `,
      });
      page.rootInstance.trip = defaultTrip;
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
          <sbb-timetable-row data-now="1660662000000">
            <mock:shadow-root>
              <sbb-card size="l">
                <div class="sbb-timetable__row">
                  <div class="sbb-timetable__row-header">
                    <div class="sbb-timetable__row-details">
                      <sbb-icon class="sbb-timetable__row-transport-type" name="picto:zug-right"></sbb-icon>
                      <sbb-icon class="sbb-timetable__row-transport" name="ir-37"></sbb-icon>
                    </div>
                    <p>
                      Direction Basel SBB
                    </p>
                  </div>
                  <sbb-pearl-chain-time arrivaltime="2022-11-30T12:13:00+01:00" data-now="1660662000000" departuretime="2022-11-30T11:08:00+01:00"></sbb-pearl-chain-time>
                  <div class="sbb-timetable__row-footer">
                    <time>
                      1 h 15 min
                    </time>
                  </div>
                </div>
              </sbb-card>
            </mock:shadow-root>
          </sbb-timetable-row>
      `);
    });
  });

  describe('sbb-timetable-row with BusTrip', () => {
    it('renders component with config', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `
            <sbb-timetable-row data-now="${now}">
            </sbb-timetable-row>
        `,
      });
      page.rootInstance.trip = BusTrip;
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
          <sbb-timetable-row data-now="1660662000000">
            <mock:shadow-root>
              <sbb-card size="l">
                <div class="sbb-timetable__row">
                  <div class="sbb-timetable__row-header">
                    <div class="sbb-timetable__row-details">
                      <sbb-icon class="sbb-timetable__row-transport-type" name="picto:bus-right"></sbb-icon>
                      <span class="sbb-timetable__row-transportnumber">
                        B 19
                      </span>
                    </div>
                    <p>
                      Direction Spiegel, Blinzern
                    </p>
                  </div>
                  <sbb-pearl-chain-time arrivalwalk="0" data-now="1660662000000" departuretime="2022-11-30T16:30:00+01:00" departurewalk="0"></sbb-pearl-chain-time>
                  <div class="sbb-timetable__row-footer">
                    <span>
                      <span class="sbb-timetable__row--quay">
                        <span class="sbb-screenreaderonly">
                          from Stand
                        </span>
                        Stand
                      </span>
                      4
                    </span>
                    <ul class="sbb-timetable__row-occupancy" role="list">
                      <li>
                        1.
                        <sbb-icon class="sbb-occupancy__item" name="utilization-low"></sbb-icon>
                        <span class="sbb-screenreaderonly">
                          First Class
                        </span>
                        <span class="sbb-screenreaderonly">
                          Low to medium occupancy expected.
                        </span>
                      </li>
                      <li>
                        2.
                        <sbb-icon class="sbb-occupancy__item" name="utilization-medium"></sbb-icon>
                        <span class="sbb-screenreaderonly">
                          Second Class
                        </span>
                        <span class="sbb-screenreaderonly">
                          High occupancy expected.
                        </span>
                      </li>
                    </ul>
                    <time>
                      41 min
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
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `<sbb-timetable-row loading-trip="true" data-now="${now}"/>`,
      });
      page.rootInstance.config = { 'loading-trip': true };
      expect(page.root).toEqualHtml(`
        <sbb-timetable-row loading-trip="true" data-now="1660662000000">
          <mock:shadow-root>
            <sbb-card class="sbb-loading" size="l">
            <sbb-card-badge class="sbb-loading__badge" slot="badge"></sbb-card-badge>
              <div class="sbb-loading__wrapper">
                <div class="sbb-loading__row"></div>
                <div class="sbb-loading__row"></div>
                <div class="sbb-loading__row"></div>
              </div>
            </sbb-card>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
    });
  });
});
