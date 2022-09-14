import { newSpecPage } from '@stencil/core/testing';
import { SbbTimetableRow } from './sbb-timetable-row';
import { config } from './sbb-timetable-row.sample-data';

describe('sbb-timetable-row', () => {
  describe('sbb-timetable-row with config', () => {
    it('renders component with config', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `
            <sbb-timetable-row>
            </sbb-timetable-row>
        `,
      });
      page.rootInstance.trip = config.trip;
      page.rootInstance.price = config.price;
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
      <sbb-timetable-row>
      <mock:shadow-root>
        <sbb-timetable-row-button role="presentation">
          <div class="sbb-timetable__row sbb-timetable__row-badge" role="row">
            <sbb-card-badge appearance="primary" isdiscount="" price="12" text="ab CHF"></sbb-card-badge>
            <div class="sbb-timetable__row-header" role="rowheader">
              <div class="sbb-timetable__row-details">
                <sbb-icon name="train-small"></sbb-icon>
                <sbb-icon class="timetable__row-transport" name="ir-27"></sbb-icon>
              </div>
              <p>
                Direction Luzern
              </p>
            </div>
            <sbb-pearl-chain-time arrivaltime="2022-10-28T21:16:00+02:00" arrivalwalk="5" departuretime="2022-10-28T02:48:00+02:00" departurewalk="8"></sbb-pearl-chain-time>
            <div class="sbb-timetable__row-footer" role="gridcell">
              <span class="sbb-timetable__row-platform--changed">
                <span class="screenreaderonly">
                  from platform
                </span>
                <span class="sbb-timetable__row--platform">
                  Pl.
                </span>
                7
              </span>
              <div>
                <ul class="sbb-timetable__row-occupancy" role="list">
                  <li>
                    1.
                    <sbb-icon class="sbb-occupancy__item" name="utilization-high"></sbb-icon>
                    <span class="screenreaderonly">
                      First Class
                    </span>
                    <span class="screenreaderonly">
                      Very high occupancy expected.
                    </span>
                  </li>
                  <li>
                    2.
                    <sbb-icon class="sbb-occupancy__item" name="utilization-high"></sbb-icon>
                    <span class="screenreaderonly">
                      Second Class
                    </span>
                    <span class="screenreaderonly">
                      Very high occupancy expected.
                    </span>
                  </li>
                </ul>
              </div>
              <ul class="sbb-timetable__row-hints" role="list">
                <li>
                  <sbb-icon aria-hidden="false" aria-label="Tilting train" class="sbb-travel-hints__item" name="sa-rr"></sbb-icon>
                </li>
                <li>
                  <sbb-icon aria-hidden="false" aria-label="Tilting train" class="sbb-travel-hints__item" name="sa-z"></sbb-icon>
                </li>
                <li>
                  <sbb-icon aria-hidden="false" aria-label="Tilting train" class="sbb-travel-hints__item" name="sa-om"></sbb-icon>
                </li>
                <li>
                  <sbb-icon aria-hidden="false" aria-label="Tilting train" class="sbb-travel-hints__item" name="sa-fs"></sbb-icon>
                </li>
              </ul>
              <time>
                19 h 32 min
              </time>
              <span class="sbb-timetable__row-warning">
                <sbb-icon aria-hidden="false" aria-label="test" name="delay"></sbb-icon>
              </span>
            </div>
          </div>
        </sbb-timetable-row-button>
      </mock:shadow-root>
    </sbb-timetable-row>
      `);
    });
  });

  describe('sbb-timetable-row loading state', () => {
    it('renders loading state', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `<sbb-timetable-row loading-trip="true" />`,
      });
      page.rootInstance.config = { 'loading-trip': true };
      expect(page.root).toEqualHtml(`
        <sbb-timetable-row loading-trip="true">
          <mock:shadow-root>
            <sbb-timetable-row-button class="sbb-loading" disabled="" role="presentation">
              <div class="sbb-loading">
                <div class="sbb-loading__row"></div>
                <div class="sbb-loading__row"></div>
                <div class="sbb-loading__row"></div>
              </div>
            </sbb-timetable-row-button>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
    });
  });

  describe('sbb-timetable-row click event', () => {
    it('emits an event when clicked', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `
        <sbb-timetable-row>
        </sbb-timetable-row>
       `,
      });
      page.rootInstance.trip = config.trip;
      page.rootInstance.price = config.price;
      const element = page.root.shadowRoot.querySelector('sbb-timetable-row-button');
      const buttonSpy = jest.fn();

      page.win.addEventListener('sbb-timetable-row_click', buttonSpy);
      element.click();
      await page.waitForChanges();
      expect(buttonSpy).toHaveBeenCalled();
    });
  });
});
