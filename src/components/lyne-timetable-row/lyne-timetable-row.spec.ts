import { LyneTimetableRow } from './lyne-timetable-row';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-row', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRow],
      html: '<lyne-timetable-row />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-row>
      `);
  });

});
