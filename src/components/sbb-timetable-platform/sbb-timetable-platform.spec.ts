import { SbbTimetablePlatform } from './sbb-timetable-platform';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-platform.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-platform', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetablePlatform],
      html: `<sbb-timetable-platform config='${config}'/>`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-platform
            config="{&quot;platform&quot;:&quot;13A/C&quot;}"
        >
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
        </sbb-timetable-platform>
      `);
  });
});
