import { LyneTimetablePlatform } from './lyne-timetable-platform';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-platform.sample-data';

describe('lyne-timetable-platform', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetablePlatform],
      html: `<lyne-timetable-platform config='${JSON.stringify(sampleData[0])}' role='gridcell'/>`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-platform
            config='{"platform": "13A/C"}'
            role='gridcell'
        >
          <mock:shadow-root>
            <p
                aria-label="from platform 12B/C."
                class="platform"
                role="text"
            >
                <span class="platform__text">
                    Pl.
                </span>
                13A/C
            </p>
          </mock:shadow-root>
        </lyne-timetable-platform>
      `);
  });

});
