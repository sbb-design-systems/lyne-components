import { newSpecPage } from '@stencil/core/testing';
import { SbbTimetableRow } from './sbb-timetable-row';
import { config } from './sbb-timetable-row.sample-data';

const now = new Date('2022-08-16T15:00:00Z').valueOf();

describe('sbb-timetable-row', () => {
  describe('sbb-timetable-row with config', () => {
    it('renders component with config', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `
            <sbb-timetable-row data-now="${now}">
            </sbb-timetable-row>
        `,
      });
      page.rootInstance.trip = config.trip;
      page.rootInstance.price = config.price;
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
      <sbb-timetable-row data-now="1660662000000">
      <mock:shadow-root>
        <sbb-card>
          <sbb-card-badge appearance="primary" isdiscount="" price="12" slot="badge" text="ab CHF"></sbb-card-badge>
          <div class="sbb-timetable__row">
            <div class="sbb-timetable__row-header">
              <div class="sbb-timetable__row-details">
                <sbb-icon name="train-small"></sbb-icon>
                <sbb-icon class="sbb-timetable__row-transport" name="ir-27"></sbb-icon>
              </div>
              <p>
                Direction Luzern
              </p>
            </div>
            <sbb-pearl-chain-time arrivaltime="2022-10-28T21:16:00+02:00" arrivalwalk="5" departuretime="2022-10-28T02:48:00+02:00" departurewalk="8" data-now="1660662000000"></sbb-pearl-chain-time>
            <div class="sbb-timetable__row-footer">
              <span class="sbb-timetable__row-quay--changed">
                <span class="sbb-screenreaderonly">
                  from platform
                </span>
                <span class="sbb-timetable__row--quay">
                  Pl.
                </span>
                7
              </span>
              <ul class="sbb-timetable__row-occupancy" role="list">
                <li>
                  1.
                  <sbb-icon class="sbb-occupancy__item" name="utilization-high"></sbb-icon>
                  <span class="sbb-screenreaderonly">
                    First Class
                  </span>
                  <span class="sbb-screenreaderonly">
                    Very high occupancy expected.
                  </span>
                </li>
                <li>
                  2.
                  <sbb-icon class="sbb-occupancy__item" name="utilization-high"></sbb-icon>
                  <span class="sbb-screenreaderonly">
                    Second Class
                  </span>
                  <span class="sbb-screenreaderonly">
                    Very high occupancy expected.
                  </span>
                </li>
              </ul>
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
            <sbb-card class="sbb-loading">
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
      const element = page.root.shadowRoot.querySelector('sbb-card');
      const buttonSpy = jest.fn();

      page.win.addEventListener('sbb-timetable-row_click', buttonSpy);
      element.click();
      await page.waitForChanges();
      expect(buttonSpy).toHaveBeenCalled();
    });
  });
});
