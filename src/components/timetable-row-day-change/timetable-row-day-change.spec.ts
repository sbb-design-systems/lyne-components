import sampleData from './timetable-row-day-change.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './timetable-row-day-change';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-row-day-change', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-timetable-row-day-change config="${config}"></sbb-timetable-row-day-change>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-row-day-change
            config="{&quot;colSpan&quot;:9,&quot;date&quot;:&quot;02.12.2021&quot;,&quot;day&quot;:&quot;Thursday&quot;,&quot;dayChange&quot;:false,&quot;hidden&quot;:false}"
        >

        </sbb-timetable-row-day-change>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <div
                class="day-change"
                colspan="9"
            >
                <h2 class="day-change__text">
                    <span
                        aria-hidden="true"
                        class="day-change__text--visual"
                        role="presentation"
                    >
                        Thursday, 02.12.2021
                    </span>
                    <span
                        aria-label="Departures on Thursday, 02.12.2021"
                        class="day-change__text--visually-hidden"
                        role="text"
                    >
                        Departures on  Thursday, 02.12.2021
                    </span>
                </h2>
            </div>
          `,
    );
  });
});
