import { LyneTimetableTransportationTime } from './lyne-timetable-transportation-time';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-time.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-transportation-time', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableTransportationTime],
      html: `<lyne-timetable-transportation-time config='${config}'/>`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-time
            config="{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;}"
        >
          <mock:shadow-root>
            <p
                aria-label="Departure 15:14."
                class="time time--departure time--first-level"
                role="text"
            >
                <span
                    aria-hidden="true"
                    class="time__text"
                    role="presentation"
                >
                    15:14
                </span>
                <span
                    class="time__text--visually-hidden"
                >
                    Departure 15:14.
                </span>
            </p>
          </mock:shadow-root>
        </lyne-timetable-transportation-time>
      `);
  });

});
