import { LyneTimetableDuration } from './lyne-timetable-duration';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-duration.sample-data';

describe('lyne-timetable-duration', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableDuration],
      html: `<lyne-timetable-duration config='${JSON.stringify(sampleData['2'])}' role='gridcell' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-duration
            config='{"hours":3,"minutes":12}'
            role='gridcell'
        >
          <mock:shadow-root>
            <p
                aria-label="3 Hours 12 Minutes."
                class="duration"
                role="text"
            >
                <span class="duration__text">
                    3 h 12 min
                </span>
            </p>
          </mock:shadow-root>
        </lyne-timetable-duration>
      `);
  });

});
