import { LyneTimetableRowDayChange } from './lyne-timetable-row-day-change';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-row-day-change.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('lyne-timetable-row-day-change', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowDayChange],
      html: `<lyne-timetable-row-day-change config='${config}' role='gridcell' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-day-change
            config="{&quot;colSpan&quot;:7,&quot;date&quot;:&quot;02.12.2021&quot;,&quot;day&quot;:&quot;Thursday&quot;,&quot;dayChange&quot;:false,&quot;hidden&quot;:false}"
            role="gridcell"
        >
          <mock:shadow-root>
            <div
                class="day-change"
                colspan="7"
                role="gridcell"
            >
                <h2 class="day-change__text">
                    <span
                        aria-hidden="true"
                        class="day-change__text--visual"
                        role="presentation"
                    >
                        Thursday, 02.12.2021
                    </span>
                    <span
                        aria-label="Departures on Thursday, 02.12.2021"
                        class="day-change__text--visually-hidden"
                        role="text"
                    >
                        Departures on  Thursday, 02.12.2021
                    </span>
                </h2>
            </div>
          </mock:shadow-root>
        </lyne-timetable-row-day-change>
      `);
  });

});
