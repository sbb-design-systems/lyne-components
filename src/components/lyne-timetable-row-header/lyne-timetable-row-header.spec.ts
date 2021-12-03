import { LyneTimetableRowHeader } from './lyne-timetable-row-header';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-row-header', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowHeader],
      html: '<lyne-timetable-row-header />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-header>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-row-header>
      `);
  });

});
