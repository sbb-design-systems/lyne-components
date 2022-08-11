import { newSpecPage } from '@stencil/core/testing';
import { SbbTimetableRow } from './sbb-timetable-row';
import sampleData from './sbb-timetable-row.sample-data';

describe('sbb-timetable-row', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetableRow],
      html: `<sbb-timetable-row config='${sampleData}'/>`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-row config="${sampleData}">
          <mock:shadow-root>
            <div role="presentation">
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
            </div>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
  });
});
