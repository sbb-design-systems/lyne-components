import { LyneTimetableTransportationTime } from './lyne-timetable-transportation-time';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-time', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableTransportationTime],
      html: '<lyne-timetable-transportation-time />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-time>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-transportation-time>
      `);
  });

});
