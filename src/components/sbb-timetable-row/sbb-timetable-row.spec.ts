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
                      <slot name="pictogram">
                        <sbb-icon></sbb-icon>
                      </slot>
                    <slot name="product">
                      <span class="timetable__row-transportnumber">
                        undefined undefined
                      </span>
                    </slot>
                  </div>
                  <slot name="direction">
                    <p>
                      Direction undefined
                    </p>
                  </slot>
                </div>
                <div class="timetable__row-body" role="gridcell">
                  <slot name="leftTime">
                    <time class="timetable__row-time" datetime="undefined">
                      <span class="screenreaderonly">
                        Departure
                      </span>
                      undefined:undefined
                    </time>
                  </slot>
                  <slot name="pearlChain">
                  </slot>
                  <slot name="rightTime">
                    <time class="timetable__row-time" datetime="undefined">
                      <span class="screenreaderonly">
                        Arrival
                      </span>
                      undefined:undefined
                    </time>
                  </slot>
                </div>
                <div class="timetable__row-footer" role="gridcell">
                  <slot name="platform">
                    <span></span>
                  </slot>
                  <slot name="travelHints"></slot>
                  <slot name="duration">
                    <time></time>
                  </slot>
                  <slot name="warning"></slot>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
  });
});
