import { LyneTimetableUtilization } from './lyne-timetable-occupancy';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-occupancy', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableUtilization],
      html: '<lyne-timetable-occupancy />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-occupancy>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-occupancy>
      `);
  });

});
