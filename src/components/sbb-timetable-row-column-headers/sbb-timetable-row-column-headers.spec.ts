import { SbbTimetableRowColumnHeaders } from './sbb-timetable-row-column-headers';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row-column-headers.sample-data';

const config = JSON.stringify(sampleData);

describe('sbb-timetable-row-column-headers', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetableRowColumnHeaders],
      html: `<sbb-timetable-row-column-headers config='${config}' />`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-row-column-headers
            config="[&quot;Short Infos&quot;,&quot;Summary&quot;,&quot;&quot;,&quot;Platfom&quot;,&quot;Occupancy Forecast&quot;,&quot;Travel hints&quot;,&quot;Duration&quot;,&quot;Real time information&quot;]"
        >
          <mock:shadow-root>
            <div class="column-headers" role="none">
                <div role="columnheader">Short Infos</div>
                <div role="columnheader">Summary</div>
                <div role="columnheader"></div>
                <div role="columnheader">Platfom</div>
                <div role="columnheader">Occupancy Forecast</div>
                <div role="columnheader">Travel hints</div>
                <div role="columnheader">Duration</div>
                <div role="columnheader">Real time information</div>
            </div>
          </mock:shadow-root>
        </sbb-timetable-row-column-headers>
      `);
  });
});
