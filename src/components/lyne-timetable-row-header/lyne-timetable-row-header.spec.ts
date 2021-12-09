import { LyneTimetableRowHeader } from './lyne-timetable-row-header';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-row-header.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-row-header', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowHeader],
      html: `<lyne-timetable-row-header config='${config}' role='rowheader' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-header
            config="{&quot;departure&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;productMarketingName&quot;:&quot;&quot;,&quot;productText&quot;:&quot;IC 8&quot;,&quot;time&quot;:&quot;15:14&quot;}}"
            role="rowheader"
        >
          <mock:shadow-root>
            <h3 class="row-header">15:14 IC 8  Direction Romanshorn.</h3>
          </mock:shadow-root>
        </lyne-timetable-row-header>
      `);
  });

});
