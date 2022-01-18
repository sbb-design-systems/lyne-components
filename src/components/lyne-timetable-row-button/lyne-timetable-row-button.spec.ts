import { LyneTimetableRowButton } from './lyne-timetable-row-button';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-timetable-row-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableRowButton],
      html: '<lyne-timetable-row-button expanded="false"/>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-row-button expanded="false">
          <mock:shadow-root>
            <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Connection details and purchase options"
                type="button"
            >
            </button>
          </mock:shadow-root>
        </lyne-timetable-row-button>
      `);
  });

});
