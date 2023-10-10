import sampleData from './sbb-timetable-row-column-headers.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-timetable-row-column-headers';

const config = JSON.stringify(sampleData);

describe('sbb-timetable-row-column-headers', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-timetable-row-column-headers config="${config}"></sbb-timetable-row-column-headers>`);

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-row-column-headers
            config="[&quot;Short Infos&quot;,&quot;Summary&quot;,&quot;&quot;,&quot;Platform&quot;,&quot;Occupancy Forecast&quot;,&quot;Travel hints&quot;,&quot;Duration&quot;,&quot;Real time information&quot;]"
        >

        </sbb-timetable-row-column-headers>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <div class="column-headers" role="none">
                <div role="columnheader">Short Infos</div>
                <div role="columnheader">Summary</div>
                <div role="columnheader"></div>
                <div role="columnheader">Platform</div>
                <div role="columnheader">Occupancy Forecast</div>
                <div role="columnheader">Travel hints</div>
                <div role="columnheader">Duration</div>
                <div role="columnheader">Real time information</div>
            </div>
          `,
    );
  });
});
