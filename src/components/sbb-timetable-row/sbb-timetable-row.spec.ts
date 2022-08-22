import { newSpecPage } from '@stencil/core/testing';
import { SbbTimetableRow } from './sbb-timetable-row';
import { config } from './sbb-timetable-row.sample-data';

describe('sbb-timetable-row', () => {
  describe('sbb-timetable-row with config', () => {
    it('renders compont with config', async () => {
      const page = await newSpecPage({
        components: [SbbTimetableRow],
        html: `
            <sbb-timetable-row>
            </sbb-timetable-row>
        `,
      });
      page.rootInstance.config = config;
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-timetable-row>
          <mock:shadow-root>
            <div class="relative" role="presentation">
              <div class="timetable__row timetable__row-badge" role="row">
                <sbb-card-badge>
                  <span slot="generic">
                    % ab CHF 39.90
                  </span>
                </sbb-card-badge>
                <div class="timetable__row-header" role="rowheader">
                  <div class="timetable__row-details">
                    <sbb-icon name="train-small"></sbb-icon>
                    <sbb-icon class="timetable__row-transport" name="ir-27"></sbb-icon>
                  </div>
                  <p>
                    Direction Luzern
                  </p>
                </div>
                <div class="timetable__row-body" role="gridcell">
                  <span class="timetable__row-walktime">
                    <sbb-icon name="walk-small"></sbb-icon>
                    <time datetime="P8M">
                      <span class="screenreaderonly">
                        minutes of walking time before departure:
                      </span>
                      8
                      <span aria-hidden="true">
                        '
                      </span>
                    </time>
                  </span>
                  <time class="timetable__row-time" datetime="0:48">
                    <span class="screenreaderonly">
                      Departure
                    </span>
                    0:48
                  </time>
                  <sbb-pearl-chain class="timetable__row-chain" legs=""></sbb-pearl-chain>
                  <time class="timetable__row-time" datetime="19:16">
                    <span class="screenreaderonly">
                      Arrival
                    </span>
                    19:16
                  </time>
                  <span class="timetable__row-walktime">
                    <time datetime="P5M">
                      <span class="screenreaderonly">
                        minutes of walking time after arrival:
                      </span>
                      5
                      <span aria-hidden="true">
                        '
                      </span>
                    </time>
                    <sbb-icon name="walk-small"></sbb-icon>
                  </span>
                </div>
                <div class="timetable__row-footer" role="gridcell">
                  <span class="timetable__row-platform--changed">
                    Gl. 88
                  </span>
                  <div>
                    <ul class="timetable__row-occupancy" role="list">
                      <li>
                        1.
                        <sbb-icon class="occupancy__item" name="utilization-high"></sbb-icon>
                      </li>
                      <li>
                        2.
                        <sbb-icon class="occupancy__item" name="utilization-high"></sbb-icon>
                      </li>
                    </ul>
                  </div>
                  <ul class="timetable__row-hints" role="list">
                    <li>
                      <sbb-icon aria-hidden="false" class="travel-hints__item" name="sa-rr"></sbb-icon>
                    </li>
                    <li>
                      <sbb-icon aria-hidden="false" class="travel-hints__item" name="sa-z"></sbb-icon>
                    </li>
                    <li>
                      <sbb-icon aria-hidden="false" class="travel-hints__item" name="sa-om"></sbb-icon>
                    </li>
                    <li>
                      <sbb-icon aria-hidden="false" class="travel-hints__item" name="sa-fs"></sbb-icon>
                    </li>
                  </ul>
                  <time>
                    19 h 32 min
                  </time>
                  <span class="timetable__row-warning">
                    <sbb-icon aria-hidden="false" aria-label="test" name="delay"></sbb-icon>
                  </span>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
    });
  });

  describe('sbb-timetable-row loading state', () => {
    it('renders loading state', async () => {
      const { root } = await newSpecPage({
        components: [SbbTimetableRow],
        html: `<sbb-timetable-row loading="true" />`,
      });

      expect(root).toEqualHtml(`
        <sbb-timetable-row loading="true">
          <mock:shadow-root>
            <div>
              <div class="loading">
                <span class="loading__badge"></span>
                <div class="loading__row"></div>
                <div class="loading__row"></div>
                <div class="loading__row"></div>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
    });
  });
});
