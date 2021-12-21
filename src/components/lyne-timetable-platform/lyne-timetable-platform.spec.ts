import { LyneTimetablePlatform } from './lyne-timetable-platform';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-platform.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-platform', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetablePlatform],
      html: `<lyne-timetable-platform config='${config}' role='gridcell'/>`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-platform
            config="{&quot;platform&quot;:&quot;13A/C&quot;}"
            role="gridcell">
          <mock:shadow-root>
            <p
                aria-label="from platform 13A/C."
                class="platform platform--first-level"
                role="text"
            >
                <span
                    aria-hidden="true"
                    class="platform__text"
                    role="presentation"
                >
                    Pl. 13A/C
                </span>
                <span class="platform__text--visually-hidden">from platform 13A/C.</span>
            </p>
          </mock:shadow-root>
        </lyne-timetable-platform>
      `);
  });

});
