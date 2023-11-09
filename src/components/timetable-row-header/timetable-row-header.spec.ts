import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleData from './timetable-row-header.sample-data';
import './timetable-row-header';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-row-header', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-timetable-row-header
        config="${config}"
        role="rowheader"
      ></sbb-timetable-row-header>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-row-header
            config="{&quot;departure&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;productMarketingName&quot;:&quot;&quot;,&quot;productText&quot;:&quot;IC 8&quot;,&quot;time&quot;:&quot;15:14&quot;}}"
            role="rowheader"
        >

        </sbb-timetable-row-header>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <h3 class="row-header">15:14 IC 8  Direction Romanshorn.</h3>
          `,
    );
  });
});
