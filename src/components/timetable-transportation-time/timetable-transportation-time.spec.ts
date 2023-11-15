import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleData from './timetable-transportation-time.sample-data';
import './timetable-transportation-time';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-time', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-timetable-transportation-time
        config="${config}"
      ></sbb-timetable-transportation-time>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-transportation-time
            config="{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;}"
        >

        </sbb-timetable-transportation-time>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
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
          `,
    );
  });
});
