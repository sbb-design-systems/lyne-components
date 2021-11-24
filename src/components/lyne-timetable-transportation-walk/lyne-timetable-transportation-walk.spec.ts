import { LyneTimetableTransportationWalk } from './lyne-timetable-transportation-walk';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-walk', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableTransportationWalk],
      html: '<lyne-timetable-transportation-walk />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-walk>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-transportation-walk>
      `);
  });

});
