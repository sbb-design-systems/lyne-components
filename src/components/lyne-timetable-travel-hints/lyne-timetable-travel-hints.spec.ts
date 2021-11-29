import { LyneTimetableTravelHints } from './lyne-timetable-travel-hints';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-travel-hints', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableTravelHints],
      html: '<lyne-timetable-travel-hints />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-travel-hints>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-travel-hints>
      `);
  });

});
