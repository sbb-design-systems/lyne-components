import { LyneTimetablePlatform } from './lyne-timetable-platform';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-platform', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetablePlatform],
      html: '<lyne-timetable-platform platform="12B/C" role="gridcell"/>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-platform
            platform="12B/C"
            role="gridcell"
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
                12B/C
            </p>
          </mock:shadow-root>
        </lyne-timetable-platform>
      `);
  });

});
