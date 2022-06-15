import { SbbTimetableRowDayChange } from './sbb-timetable-row-day-change';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row-day-change.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-row-day-change', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTimetableRowDayChange],
      html: `<sbb-timetable-row-day-change config='${config}' />`
    });

    expect(root)
      .toEqualHtml(`
        <sbb-timetable-row-day-change
            config="{&quot;colSpan&quot;:9,&quot;date&quot;:&quot;02.12.2021&quot;,&quot;day&quot;:&quot;Thursday&quot;,&quot;dayChange&quot;:false,&quot;hidden&quot;:false}"
        >
          <mock:shadow-root>
            <div
                class="day-change"
                colspan="9"
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
        </sbb-timetable-row-day-change>
      `);
  });

});
