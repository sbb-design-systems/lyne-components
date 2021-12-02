import { LyneTimetableRowDayChange } from './lyne-timetable-row-day-change';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-row-day-change', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowDayChange],
      html: '<lyne-timetable-row-day-change />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-day-change>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-row-day-change>
      `);
  });

});
