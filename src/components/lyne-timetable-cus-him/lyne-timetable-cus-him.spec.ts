import { LyneTimetableCusHim } from './lyne-timetable-cus-him';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-cus-him', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableCusHim],
      html: '<lyne-timetable-cus-him />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-cus-him>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-cus-him>
      `);
  });

});
