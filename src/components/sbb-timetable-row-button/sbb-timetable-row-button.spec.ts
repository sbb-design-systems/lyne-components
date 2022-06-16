import { SbbTimetableRowButton } from './sbb-timetable-row-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-timetable-row-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTimetableRowButton],
      html: '<sbb-timetable-row-button expanded="false"/>'
    });

    expect(root)
      .toEqualHtml(`
        <sbb-timetable-row-button expanded="false">
          <mock:shadow-root>
            <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Connection details and purchase options"
                type="button"
            >
            </button>
          </mock:shadow-root>
        </sbb-timetable-row-button>
      `);
  });

});
