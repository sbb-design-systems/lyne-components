import { LyneTimetableDuration } from './lyne-timetable-duration';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-duration.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-duration', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableDuration],
      html: `<lyne-timetable-duration config='${config}' role='gridcell' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-duration
            config="{&quot;hours&quot;:0,&quot;minutes&quot;:37}"
            role="gridcell"
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
        </lyne-timetable-duration>
      `);
  });

});
