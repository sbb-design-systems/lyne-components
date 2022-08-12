import { newSpecPage } from '@stencil/core/testing';
import { SbbTimetableRow } from './sbb-timetable-row';
import { config } from './sbb-timetable-row.sample-data';

describe('sbb-timetable-row', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetableRow],
      html: `<sbb-timetable-row config='${config}'/>`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-row config='${config}'>
          <mock:shadow-root>
            <sbb-timetable-row-button role="presentation">
              <div class="timetable__row" role="row">
                <div class="timetable__row-header" role="rowheader">
                  <div class="timetable__row-details">
                    <sbb-icon></sbb-icon>
                    <span class="timetable__row-transportnumber">
                      undefined undefined
                    </span>
                  </div>
                  <p>
                    Direction undefined
                  </p>
                </div>
                <div class="timetable__row-body" role="gridcell">
                  <time class="timetable__row-time" datetime="undefined">
                    <span class="screenreaderonly">
                      Departure
                    </span>
                    undefined:undefined
                  </time>
                  <sbb-pearl-chain class="timetable__row-chain"></sbb-pearl-chain>
                  <time class="timetable__row-time" datetime="undefined">
                    <span class="screenreaderonly">
                      Arrival
                    </span>
                    undefined:undefined
                  </time>
                </div>
                <div class="timetable__row-footer" role="gridcell">
                <span></span>
                <time></time>
                </div>
              </div>
            </sbb-timetable-row-button>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
  });
});
