import { LyneTimetableRowButton } from './lyne-timetable-row-button';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-row-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowButton],
      html: '<lyne-timetable-row-button />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-button>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-row-button>
      `);
  });

});
