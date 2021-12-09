import { LyneTimetableRowColumnHeaders } from './lyne-timetable-row-column-headers';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-row-column-headers.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-row-column-headers', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowColumnHeaders],
      html: '<lyne-timetable-row-column-headers />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-column-headers>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-row-column-headers>
      `);
  });

});
