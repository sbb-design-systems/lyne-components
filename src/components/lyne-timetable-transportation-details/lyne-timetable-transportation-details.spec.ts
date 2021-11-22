import { LyneTimetableDetails } from './lyne-timetable-transportation-details';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-details', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableDetails],
      html: '<lyne-timetable-transportation-details />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-details>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-transportation-details>
      `);
  });

});
