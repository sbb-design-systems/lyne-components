import { LyneTimetableFormJourney } from './lyne-timetable-form-journey';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-form-journey', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableFormJourney],
      html: '<lyne-timetable-form-journey />'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-form-journey>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </lyne-timetable-form-journey>
      `);
  });

});
