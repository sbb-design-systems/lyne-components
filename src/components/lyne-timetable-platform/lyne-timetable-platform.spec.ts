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
            <span class="platform">
                <span class="platform__visuallyhidden">from platform</span>
                <span
                    aria-hidden="true"
                    class="platform__text"
                    role="presentation"
                >
                    Pl.
                </span>
                12B/C
            </span>
          </mock:shadow-root>
        </lyne-timetable-platform>
      `);
  });

});
