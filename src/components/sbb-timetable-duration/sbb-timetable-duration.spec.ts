import { SbbTimetableDuration } from './sbb-timetable-duration';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-duration.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-duration', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetableDuration],
      html: `<sbb-timetable-duration config='${config}' />`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-duration
            config="{&quot;hours&quot;:0,&quot;minutes&quot;:37}"
        >
          <mock:shadow-root>
            <p
                aria-label=" 37 Minutes."
                class="duration"
                role="text"
            >
                <span
                    aria-hidden="true"
                    class="duration__text--visual"
                    role="presentation"
                >
                    37 min
                </span>
                <span class="duration__text--visually-hidden">
                    37 Minutes.
                </span>
            </p>
          </mock:shadow-root>
        </sbb-timetable-duration>
      `);
  });
});
